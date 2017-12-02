import {call, put, select, takeEvery, all, fork} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {push} from 'connected-react-router'
import {notify} from 'common/uiElements/Notify'

import * as actEnums from '../actions/registerKKTActions'
import * as enumsRP from '../enums/actions'
import * as dataContext from '../dataProvider/retialPointsDataContext'
import * as enums from '../enums/registerKKTEnums'
import {getRetailPointList} from '../selectors/retailPointSelectors'
import {getRegisterKKTState, getInitPulling} from '../selectors/registerKKTSelectors'
import {generateNumbers} from 'infrastructure/utils/uuidGenerator'
import {getRetailPoints, updateStatusRP, showErrorPopup} from '../actions/retailPointActions'


// запускает проверку торг.точек если есть хотя бы одна точка со статусом ожидания
function* init({response}) {
	try {
		// остановит авто-запросы еще они уже запущены
		const initPulling = yield select(getInitPulling);
		if (initPulling) return false;
		yield put(actEnums.setInitPulling(true));


		let checkedRP = getListCheckingRP(response);
		const isCheckedServer = !!(Object.keys(checkedRP).length);

		if (isCheckedServer) {
			let countError = 0;
			let checking = true;
			while (checking) {
				yield delay(60000);

				try {
					let updLsRP = false;
					const responseRP = yield call(dataContext.getRetailPoints);

					for (let i = 0; i < responseRP.length; i++) {
						let item = responseRP[i];

						if (!checkedRP[item.id])
							continue;
						if (item.registrationRequestStatus === checkedRP[item.id].registrationRequestStatus)
							continue;

						// yield put(notify.info(`У торговой точки "${item.name}" изменился статус регистрации в ОФД`));
						checkedRP[item.id].registrationRequestStatus = item.registrationRequestStatus;
						updLsRP = true;
					}

					if (updLsRP) {
						yield put(getRetailPoints.success(responseRP));

						checkedRP = getListCheckingRP(responseRP);
						if (!(Object.keys(checkedRP).length)) {
							checking = false;
						}
					}

					countError = 0;	// сброс счетчика ошибок
				} catch (error) {
					// остановить при 3-х подряд ошибках
					if (countError >= 3) {
						checking = false;
						yield put(notify.error('В процессе загрузки произошла ошибка, пожалуйста повторите позже'));
						yield put(actEnums.setInitPulling(false));
					}
					countError++;
				}
			}
		}
	} catch (error) {
	}

	function getListCheckingRP(items) {
		let checkedRP = {};
		(items || []).forEach(item => {
			if (enums.STATUS_CHECK_SERVER.includes(item.registrationRequestStatus)) {
				checkedRP[item.id] = item;
			}
		});

		return checkedRP;
	}
}

// Переодическая проверка статуса точки на сервере
function* subscribeRunChecker({retailPointID, noSign = false}) {
	const listRP = yield select(getRegisterKKTState);
	const elementRP = listRP.get(retailPointID).toJS();
	let noUpdate = false;

	let setStore = {};
	let session = {};
	let countError = 0;
	let checking = true;
	while (checking) {
		yield delay(5000);

		try {
			// для остановки долбешки сервера...
			const listRP = yield select(getRegisterKKTState);
			const regKKTState = listRP.get(retailPointID).toJS();
			const {runCheck} = regKKTState;
			if (!runCheck) {
				checking = false;
				break;
			}

			// Запрашиваем статус торг.точки
			const {kktStatus, registrationRequestStatus} = yield call(dataContext.getRetailPoint, {id: retailPointID});

			if (setStore.registrationRequestStatus !== registrationRequestStatus) {
				yield put(updateStatusRP({retailPointID, kktStatus, registrationRequestStatus}));
			}

			setStore.kktStatus = kktStatus;
			setStore.registrationRequestStatus = registrationRequestStatus;

			// region Logic subscriber
			switch (registrationRequestStatus) {

				// Ожидание ответа ФНС
				case (enums.SERVER_STATUS.OFD_WAIT_IRUD):
				case (enums.SERVER_STATUS.OFD_WAIT_RNM):
					if (!noUpdate) {
						setStore.step = 3;
						setStore.showLayer = 'successTransferOFD';

						if (!elementRP.phone) {
							session = yield call(dataContext.getCloudSign, retailPointID);
							setStore = {...setStore, ...session};
						}

						noUpdate = true;
					}
					break;

				// Необходимо отправить Отчет о регистрации
				case (enums.SERVER_STATUS.OFD_WAIT_REPORT):
					setStore.step = 3;
					setStore.showLayer = 'ofdWaitReport';
					checking = false;
					break;

				// Отчет о регистрации отправлен в ФНС
				case (enums.SERVER_STATUS.REPORT_PRINTED):
					if (!noUpdate) {
						setStore.step = 3;
						setStore.showLayer = 'successReportSent';

						if (!regKKTState.email || !regKKTState.phone) {
							session = yield call(dataContext.getCloudSign, retailPointID);
							setStore = {...setStore, ...session};
						}

						noUpdate = true;
					}
					break;

				// Ошибка. Не удалось сформировать отчет о регистрации
				case (enums.SERVER_STATUS.REPORT_PRINT_ERROR):
					setStore.step = 3;
					setStore.showLayer = 'reportPrintError';
					checking = false;
					break;

				// Ожидание подписи отчета
				case (enums.SERVER_STATUS.OFD_WAIT_REPORT_SIGN):
					noUpdate = false;
					if (!noSign) {
						session = yield call(dataContext.getCloudSign, retailPointID);
						try {
							if (session.active) {	// если сессия активна, подписываем автоматически
								yield call(dataContext.regStartProcess, retailPointID);
								setStore.showLayer = 'loadingLayer';
								setStore.loadingMessage = 'Подписываем отчет о регистрации';
								setStore.runCheck = true;
								checking = false;
							} else {
								setStore.step = 3;
								setStore.showLayer = 'signatureDoc';
								setStore = {...setStore, ...session};
								checking = false;
							}
						} catch (error) {
							if (error.status >= 409 && error.status < 500 && error.data.message) {
								yield put(notify.error(error.data.message));
							}

							setStore.step = 3;
							setStore.showLayer = 'signatureDoc';
							setStore = {...setStore, ...session};
							checking = false;
						}
					}
					break;

				// Ожидание ответа ФНС
				case (enums.SERVER_STATUS.OFD_WAIT_FOR_FINAL_RESPONSE):
					setStore.step = 3;
					setStore.showLayer = 'SuccessTransferFNS';
					if (!regKKTState.email || !regKKTState.phone) {
						session = yield call(dataContext.getCloudSign, retailPointID);
						setStore = {...setStore, ...session};
					}
					break;

				// ФНС приняло отчет
				case (enums.SERVER_STATUS.REGISTERED):
					setStore.step = 3;
					setStore.showLayer = 'registerEND';
					checking = false;
					break;

				// ФНС НЕ приняло отчет
				case (enums.SERVER_STATUS.ERROR):
					setStore.step = 2;
					setStore.showLayer = 'registerFormOFD';
					const draft = yield call(dataContext.getDraftForm, retailPointID);
					setStore = {...setStore, ...draft};

					yield put(notify.error('ФНС не принял отчет о регистрации кассы'));
					checking = false;
					break;
			}
			// endregion Logic subscriber

			if (setStore.showLayer && regKKTState.showLayer !== setStore.showLayer) {
				yield put(actEnums.openRegKKT.success({retailPointID, ...setStore}));
				yield put({type: 'UPDATE_PR'});
			}
			if (setStore.runCheck) {
				checking = false;
				yield put({type: 'RUN_CHECK', retailPointID, noSign: true});
			}

			countError = 0;	// сброс счетчика ошибок
		} catch (error) {
			// остановить при 3-х подряд ошибках
			if (countError >= 3) {
				checking = false;
				yield put(notify.error('В процессе загрузки произошла ошибка, пожалуйста повторите позже'));
			}
			countError++;
		}
	}
}

// Вызывается при открытии заявки
function* openRegKKTSaga({retailPointID, isPush = true}) {
	// получаем статус торг.точки
	let retailPoints = yield select(getRetailPointList);
	const {
		kktStatus, registrationRequestStatus, ...props
	} = (retailPoints.toJS() || []).filter(point => {
		return point.id === retailPointID;
	})[0];

	try {
		// начальное состоние
		let pushToReg = true;
		let setStore = {step: 1, kktStatus, registrationRequestStatus, showLayer: null};
		let session = {};

		// проверка полученного статуса
		switch (registrationRequestStatus) {

			// Заявки на регистрацию нет или есть заявка в статусе черновик
			case (enums.SERVER_STATUS.NOT_EXISTS):
			case (enums.SERVER_STATUS.DRAFT):
				setStore.step = 2;
				setStore.showLayer = 'registerFormOFD';
				try {
					yield call(dataContext.getCheckRegKKT, retailPointID);
				} catch (error) {
					if (error.status === 400) {
						switch (error.data.message) {
							case ('company-not-found'):				// у компании нет в Яндекс.ОФД
								setStore.step = 1;
								setStore.closeLayer = true;
								pushToReg = false;

								yield put(showErrorPopup({typeError: 'companyNotFound', retailPointID}));
								break;
							case ('no-one-cloud-signs-found'):		// у компании нет КЭП
								setStore.step = 1;
								setStore.closeLayer = true;
								pushToReg = false;

								yield put(showErrorPopup({typeError: 'noCloudSigns', retailPointID}));
								break;
							default:
								setStore.step = 1;
								setStore.closeLayer = true;
								pushToReg = false;
								yield put(notify.error(error.data.message));
						}
					}
					else yield put(notify.error('При проверке торговой точки произошла ошибка, повторите позже'));

				}
				break;

			// Регистрация начата
			case (enums.SERVER_STATUS.STARTED):
				setStore.step = 2;
				setStore.showLayer = 'loadingLayer';
				setStore.loadingMessage = 'Формируем заявление на регистрацию';
				setStore.runCheck = true;
				break;

			// Ожидание облачной подписи
			case (enums.SERVER_STATUS.OFD_WAIT_DECL_SIGN):
				setStore.step = 2;
				setStore.showLayer = 'signatureDoc';
				session = yield call(dataContext.getCloudSign, retailPointID);
				yield call(dataContext.cloudSign, retailPointID);
				setStore = {...setStore, ...session};
				break;

			// Ожидание пока документ закончит подписываться
			case (enums.SERVER_STATUS.DECL_SIGNING):
				setStore.step = 2;
				setStore.showLayer = 'loadingLayer';
				setStore.loadingMessage = 'Подписываем заявление';
				setStore.runCheck = true;
				break;

			// Ожидание ответа ФНС
			case (enums.SERVER_STATUS.OFD_WAIT_IRUD):
			case (enums.SERVER_STATUS.OFD_WAIT_RNM):
				setStore.step = 3;
				setStore.showLayer = 'successTransferOFD';
				setStore.runCheck = true;
				session = yield call(dataContext.getCloudSign, retailPointID);
				setStore = {...setStore, ...session};
				break;

			// Необходимо отправить Отчет о регистрации
			case (enums.SERVER_STATUS.OFD_WAIT_REPORT):
				setStore.step = 3;
				setStore.showLayer = 'ofdWaitReport';
				break;

			// Формируется отчет о регистрации
			case (enums.SERVER_STATUS.REPORT_PRINT_REQUESTED):
				setStore.step = 3;
				setStore.showLayer = 'loadingLayer';
				setStore.loadingMessage = 'Формируем отчет о регистрации';
				setStore.runCheck = true;
				break;

			// Отчет о регистрации отправлен в ФНС
			case (enums.SERVER_STATUS.REPORT_PRINTED):
				session = yield call(dataContext.getCloudSign, retailPointID);
				setStore.step = 3;
				setStore.showLayer = 'successReportSent';
				setStore.runCheck = true;
				break;

			// Ошибка. Не удалось сформировать отчет о регистрации
			case (enums.SERVER_STATUS.REPORT_PRINT_ERROR):
				setStore.step = 3;
				setStore.showLayer = 'reportPrintError';
				break;

			// Ожидание подписи отчета
			case (enums.SERVER_STATUS.OFD_WAIT_REPORT_SIGN):
				session = yield call(dataContext.getCloudSign, retailPointID);
				try {
					if (session.active) {	// если сессия активна, подписываем автоматически
						yield call(dataContext.regStartProcess, retailPointID);
						setStore.showLayer = 'loadingLayer';
						setStore.loadingMessage = 'Подписываем отчет о регистрации';
						setStore.runCheck = true;
					} else {
						yield call(dataContext.cloudSign, retailPointID);
						setStore.step = 3;
						setStore.showLayer = 'signatureDoc';
						setStore = {...setStore, ...session};
					}
				} catch (error) {
					if (error.status === 409 && error.data.message) {
						yield put(notify.error(error.data.message));
					}

					setStore.step = 3;
					setStore.showLayer = 'signatureDoc';
					setStore = {...setStore, ...session};
				}
				break;

			// Ожидание пока документ закончит подписываться
			case (enums.SERVER_STATUS.REPORT_SIGNING):
				setStore.step = 3;
				setStore.showLayer = 'loadingLayer';
				setStore.loadingMessage = 'Подписываем отчет о регистрации';
				setStore.runCheck = true;
				break;

			// Ожидание ответа ФНС
			case (enums.SERVER_STATUS.OFD_WAIT_FOR_FINAL_RESPONSE):
				session = yield call(dataContext.getCloudSign, retailPointID);
				setStore.step = 3;
				setStore.showLayer = 'SuccessTransferFNS';
				setStore.runCheck = true;
				break;

			// ФНС приняло отчет
			case (enums.SERVER_STATUS.REGISTERED):
				setStore.step = 3;
				setStore.showLayer = 'registerEND';
				break;

			// ФНС НЕ приняло отчет или другие ошибки
			case (enums.SERVER_STATUS.ERROR):
				setStore.step = 2;
				setStore.showLayer = 'registerFormOFD';
				break;
		}

		// запрашиваем черновик и передаем в состояние
		let draft = {
			requestData: {
				kktAddress: props.fullAddress,
				pointName: props.name
			}
		};
		if (setStore.step !== 1) {
			let {requestData, company} = yield call(dataContext.getDraftForm, retailPointID);

			Object.assign(draft.requestData, requestData);
			draft.company = company;
		}
		yield put(actEnums.openRegKKT.success({retailPointID, ...session, ...setStore, ...draft}));
		if (setStore.runCheck) {
			yield put({type: 'RUN_CHECK', retailPointID});
		}

		// открыть слой регистрации
		if (pushToReg && isPush)
			yield put(push(`/retail-points/register/${retailPointID}`));

		// если печать отчета затянулась бросаем ошибку + стоп опрос сервера
		if (registrationRequestStatus === enums.SERVER_STATUS.REPORT_PRINT_REQUESTED) {
			yield delay(31000);
			yield put(actEnums.updateLayer(retailPointID, 'errorKassaConnect', 3, {
				runCheck: false,
				serverStatus: enums.SERVER_STATUS.OFD_WAIT_REPORT
			}));
		}
	} catch (error) {
		if (error.status >= 400 && error.status < 500 && error.data)
			yield put(notify.error(error.data.message));
		yield put(actEnums.openRegKKT.failure({retailPointID, error}));
	}
}

// Отправка формы регистрации в ОФД
function* sendFormFNSSaga({retailPointID, form, process = false}) {
	try {
		yield call(dataContext.postSendFormFNS, retailPointID, form);	// сохраняем в черновик

		if (process) {													// запуск процесса регистрации
			try {
				const session = yield call(dataContext.getCloudSign, retailPointID);
				yield call(dataContext.cloudSign, retailPointID);
				yield put(actEnums.updateLayer(retailPointID, 'signatureDoc', 2, session));
			} catch (error) {
				if ((error.status >= 400 && error.status < 500) && error.data)
					yield put(notify.error(error.data.message));
				else
					yield put(notify.error('При отправке формы произошла ошибка'));
				yield put(actEnums.updateLayer(retailPointID, 'registerFormOFD', 2));
			}
			yield put({type: 'UPDATE_PR'});								// обновить список торг.точек
		}
	} catch (error) {
		yield put(actEnums.sendFormFNS.failure({retailPointID, error}));
		if ((error.status >= 400 && error.status < 500) && error.data)
			yield put(notify.error(error.data.message));
		else yield put(notify.error('При сохранении черновика произошла ошибка'));
	}
}

// Запросить повтор СМС для подписи
function* codeSignatureDocSaga({retailPointID}) {
	try {
		yield call(dataContext.cloudSign, retailPointID);
		yield put(actEnums.codeSignatureDoc.success({retailPointID}));
	} catch (error) {
		yield put(actEnums.codeSignatureDoc.failure({retailPointID}));
		if (error.status >= 400 && error.status < 500)
			yield put(notify.error(error.data.message));
		else yield put(notify.error('При запросе кода-смс произошла ошибка'));
	}
}

// Отправить СМС-код
function* signatureDocSaga({retailPointID, password}) {
	try {
		// Отдельный сценарий для разных шагов
		const listRP = yield select(getRegisterKKTState);
		const elementRP = listRP.get(retailPointID).toJS();
		let loadingMessage = elementRP.step !== 2
			? 'Подписываем отчет о регистрации' : false;

		// подписываем документ
		yield call(dataContext.sessionPassword, retailPointID, password);
		yield put(actEnums.signatureDoc.success({retailPointID, loadingMessage}));

		// запускаем процесс регистрации
		try {
			yield call(dataContext.regStartProcess, retailPointID);
			yield put({type: 'RUN_CHECK', retailPointID, noSign: elementRP.step === 3});
		} catch (error) {
			if (error.status >= 409 && error.status < 500) {
				yield put(notify.error(error.data.message));
			}
			else if (error.status === 400 && error.data.message == 'Pin code is invalid') {
				yield put(actEnums.updateLayer(retailPointID, 'registerFormOFD', 2));
				yield put(notify.error('Введенный Пин-ОФД не найден')); // если не верный ПИН-ОФД показываем текст ошибки и переводим пользователя на форму
			}
			else yield put(notify.error('Произошла ошибка, пожалуйста повторите позже'));
			yield put(actEnums.signatureDoc.failure({retailPointID}));
		}
	} catch (error) {
		yield put(actEnums.signatureDoc.failure({retailPointID}));
		if (error.status >= 409 && error.status < 500) {
			yield put(notify.error(
				error.data.message === 'Invalid password'
					? 'Неверный код-смс'
					: error.data.message
			));
		}
		else if (error.status === 503) {
			yield put(notify.error('Код-смс не принят. Пожалуйста повторите позже.', 'Произошла ошибка'));
		}
		else yield put(notify.error('При подписи документа произошла ошибка'));
	}
}

// Отправить отчет о регистрации в ФНС
function* sendReportFNSSaga({retailPointID, isPush = true}) {
	try {
		// открыть слой регистрации
		if (isPush)
			yield put(push(`/retail-points/register/${retailPointID}`));

		yield call(dataContext.sendReportFNS, retailPointID);
		yield put({type: 'RUN_CHECK', retailPointID});
	} catch (error) {
		if (error.status >= 400 && error.status < 500 && error.data)
			yield put(notify.error(error.data.message));
		yield put(actEnums.updateLayer(retailPointID, 'reportPrintError', 3, {runCheck: false}));
	}
}

// Обновление списка торговых точек
function* updateRetailPoints() {
	try {
		const response = yield call(dataContext.getRetailPoints);
		yield put(getRetailPoints.success(response));
	} catch (error) {
	}
}

// Установка токена ККТ
function* installPosLinkToken({retailPointID}) {
	try {
		const posLinkToken = generateNumbers();
		const response = yield call(dataContext.installPosLinkToken, retailPointID, posLinkToken);
		yield put(actEnums.installPosLinkToken.success({response}));
	} catch (error) {
		yield put(actEnums.installPosLinkToken.failure(error));
	}
}

// при закрытии слоя реги.ККТ запустит слушателя изменения статуса торг.точки
function* closeRegisterKKTSaga() {
	try {
		const response = yield call(dataContext.getRetailPoints);
		yield put(getRetailPoints.success(response));
		yield put({type: 'CHECKED_LIST', response});
	} catch (error) {
	}
}


export default function* () {
	yield all([
		takeEvery(enumsRP.GET_RETAIL_POINTS.SUCCESS, init),
		takeEvery(actEnums.OPEN_REG_KKT.REQUEST, openRegKKTSaga),
		takeEvery(actEnums.SEND_FORM_FNS.REQUEST, sendFormFNSSaga),
		takeEvery(actEnums.CODE_SIGNATURE_DOC.REQUEST, codeSignatureDocSaga),
		takeEvery(actEnums.SIGNATURE_DOC.REQUEST, signatureDocSaga),
		takeEvery(actEnums.SEND_REPORT_REQUEST, sendReportFNSSaga),
		takeEvery(actEnums.CLOSE_REGISTER_KKT, closeRegisterKKTSaga),
		takeEvery('RUN_CHECK', subscribeRunChecker),
		takeEvery('UPDATE_PR', updateRetailPoints),
		takeEvery('CHECKED_LIST', init),

		takeEvery(actEnums.INSTALL_LINK_TOKEN.REQUEST, installPosLinkToken)
	])
}