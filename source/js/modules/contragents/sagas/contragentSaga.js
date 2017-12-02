import {call, put, takeEvery, select, throttle, all} from 'redux-saga/effects'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import {notify} from 'common/uiElements/Notify'

import * as actEnums from '../actions/contragentActions'
import {getListPropsState} from '../selectors/contragentSelectors'
import * as dataContext from '../dataProvider/contragentDataContext'
import {isServerError} from 'infrastructure/helpers/errorHelper'

function* getListContragentSaga({isFirst = false, step = false}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		const propState = yield select(getListPropsState);

		// region Filter
		let query = [];

		if (propState.q)
			query.push(`name=="*${propState.q}*"`);
		if (propState.isCashier)
			query.push('cashier==true');

		query = query.join(';');
		// endregion

		const response = yield call(dataContext.getListContragent, {
			token,
			sortField: 		propState.sortField,
			sortDirection: 	propState.sortDirection,
			count: 			propState.countStep,
			q: 				query,
			pos: 			step ? propState.pos + propState.countStep : 0
		});
		yield put(actEnums.getListContragents.success({
			list: 			response.data,
			pos: 			response.pos,
			total_count:	response.total_count,
			noItems: 		isFirst ? !(response.data.length) : propState.noItems
		}));
	} catch (error) {
		yield put(notify.error('При загрузке контрагентов произошла ошибка', 'Ошибка'));
		yield put(actEnums.getListContragents.failure(error));
		if (!isServerError(error))
			throw error;
	}
}

function* editContragentSaga({code, ...contragent}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		yield call(dataContext.editContragent, {
			token,
			code,
			isNew:			code === 'newItem',
			name:			contragent.name,
			password:		contragent.password,
			locked:			contragent.locked,
			roles:			contragent.roles
		});
		yield put(actEnums.getListContragents.request({isFirst: true}));
		yield put(actEnums.editContragent.success({code}));

		yield put(notify.success('Контрагент успешно сохранен'));
	} catch (error) {
		yield put(notify.error('При сохранении контрагента произошла ошибка', 'Ошибка'));
		yield put(actEnums.editContragent.failure(code));
		if (!isServerError(error))
			throw error;
	}
}

function* deleteContragentSaga({code}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		yield call(dataContext.deleteContragent, {
			token,
			code
		});
		yield put(actEnums.getListContragents.request({isFirst: true}));
		yield put(actEnums.editContragent.success({code}));

		yield put(notify.info('Контрагент успешно удален'));
	} catch (error) {
		yield put(notify.error('При удалении контрагента произошла ошибка', 'Ошибка'));
		yield put(actEnums.editContragent.failure(code));
	}
}

function* getByCodeContragentSaga({code}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		const {data} = yield call(dataContext.getListContragent, {
			token,
			q: `code=="${code}"`
		});

		if (data.length && data[0]) {
			yield put(actEnums.openContragent(data[0]))
		} else throw new Error();
	} catch (error) {
		yield put(notify.error('При загрузке контрагента произошла ошибка'));
	}
}


export default function*() {
	yield all([
		throttle(300, actEnums.GET_LIST.REQUEST, getListContragentSaga),
		takeEvery(actEnums.EDIT_CONTRAGENT.REQUEST, editContragentSaga),
		takeEvery(actEnums.DELETE_CONTRAGENT, deleteContragentSaga),
		takeEvery(actEnums.LOAD_DETAIL, getByCodeContragentSaga)
	])
}