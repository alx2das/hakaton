export const KKT_PLACE_DESC = {
	offline: 'Место установки кассы: торговый центр, павильон и т.п. Например, ТЦ “Гулливер”, 3 этаж, павильон №3',
	online: 'Адрес сайта интернет-магазина',
	delivery: 'Адрес места хранения кассы, либо номер автомобиля'
};

export const KKT_PLACE_DESC_BALANCE = {
	offline: 3,
	delivery: 2,
	online: 1,
};

export const KKT_MODE_ARR = [
	{
		val: 'SERVICES_ONLY',
		label: 'Используется только при оказании услуг (в случае регистрации автоматизированной системы для бланков строгой отчетности)'
	},
	{val: 'EXCISE', label: 'Используется для продажи подакцизных товаров'}
];

export const KASSA_STATUS = {
	POS_VERSION_OUTDATED: 'POS_VERSION_OUTDATED',
	KKT_NOT_PLUGGED: 'KKT_NOT_PLUGGED',
	KKT_NOT_ENABLED_FOR_FZ54: 'KKT_NOT_ENABLED_FOR_FZ54',
	FN_NOT_PLUGGED: 'FN_NOT_PLUGGED',
	NOT_REGISTERED: 'NOT_REGISTERED',
	REGISTERED: 'REGISTERED'
};

export const KASSA_STATUS_VALUE = {
	[KASSA_STATUS.POS_VERSION_OUTDATED]: 'Default',
	[KASSA_STATUS.KKT_NOT_PLUGGED]: 'Не подключена',
	[KASSA_STATUS.KKT_NOT_ENABLED_FOR_FZ54]: 'Не поддерживает 54 ФЗ',
	[KASSA_STATUS.FN_NOT_PLUGGED]: 'ФН не подключен',
	[KASSA_STATUS.NOT_REGISTERED]: 'Не поставлена на учет',
	[KASSA_STATUS.REGISTERED]: 'Зарегистрирована'
};

export const SERVER_STATUS = {
	NOT_EXISTS: 'NOT_EXISTS',
	DRAFT: 'DRAFT',
	STARTED: 'STARTED',
	OFD_WAIT_DECL_SIGN: 'OFD_WAIT_DECL_SIGN',
	DECL_SIGNING: 'DECL_SIGNING',
	OFD_WAIT_IRUD: 'OFD_WAIT_IRUD',
	OFD_WAIT_RNM: 'OFD_WAIT_RNM',
	OFD_WAIT_REPORT: 'OFD_WAIT_REPORT',
	REPORT_PRINTED: 'REPORT_PRINTED',
	OFD_WAIT_REPORT_SIGN: 'OFD_WAIT_REPORT_SIGN',
	REPORT_SIGNING: 'REPORT_SIGNING',
	OFD_WAIT_FOR_FINAL_RESPONSE: 'OFD_WAIT_FOR_FINAL_RESPONSE',
	REPORT_PRINT_REQUESTED: 'REPORT_PRINT_REQUESTED',
	REPORT_PRINT_ERROR: 'REPORT_PRINT_ERROR',
	REGISTERED: 'REGISTERED',
	ERROR: 'ERROR'
};

export const SERVER_STATUS_VALUE = {
	[SERVER_STATUS.NOT_EXISTS]: 'Заявки на регистрацию нет',
	[SERVER_STATUS.DRAFT]: 'Есть заявка в статусе “DRAFT”',
	[SERVER_STATUS.STARTED]: 'Регистрация начата',
	[SERVER_STATUS.OFD_WAIT_DECL_SIGN]: 'Ожидание облачной подписи',
	[SERVER_STATUS.OFD_WAIT_IRUD]: 'Ожидание ответа от ИРУД',
	[SERVER_STATUS.OFD_WAIT_RNM]: 'Ожидание ответа от ФНС',
	[SERVER_STATUS.OFD_WAIT_REPORT]: 'Необходимо отправить Отчет о регистрации',
	[SERVER_STATUS.OFD_WAIT_REPORT_SIGN]: 'Ожидание подписи отчета',
	[SERVER_STATUS.OFD_WAIT_FOR_FINAL_RESPONSE]: 'Ожидание ответа от ФНС',
	[SERVER_STATUS.REPORT_PRINT_REQUESTED]: 'Формируется отчет о регистрации',
	[SERVER_STATUS.REPORT_PRINT_ERROR]: 'Ошибка печати отчета о регистрации на кассе',
	[SERVER_STATUS.REGISTERED]: 'Успешно зарегистрирована',
	[SERVER_STATUS.ERROR]: 'Ошибка регистрации'
};

/*
export const LK_STATUS = {
	[KASSA_STATUS.KKT_NOT_PLUGGED]: {
		[SERVER_STATUS.NOT_EXISTS]: {
			status: 'Не подключена',
			head: 'Подключите оборудование',
			description: 'Касса не может печатать чеки, если ККТ не подключена.<br /><a href="http://modulkassa.ru/help/rabota-s-modulkassoy/modulkassa-na-android/podklyuchenie-oborudovaniya-android/podklyuchenie-fiskalnogo-registratora/" target="_blank">Подробнее о настройке.</a>',
			cssClass: 'red',
			cssClassStatusReg: 'no_connected',
		}
	},
	[KASSA_STATUS.KKT_NOT_ENABLED_FOR_FZ54]: {
		[SERVER_STATUS.NOT_EXISTS]: {
			status: 'Не поддерживает 54 ФЗ',
			head: 'Проверьте модель в реестре налоговой',
			description: 'Касса не передает данные по новым правилам 54 ФЗ. Уточните разрешенные ККТ <a href="http://kkt-online.nalog.ru" target="_blank">в списке налоговой</a>.',
			cssClassStatusReg: 'no_fz-54',
			cssClass: 'red'
		}
	},
	[KASSA_STATUS.FN_NOT_PLUGGED]: {
		[SERVER_STATUS.NOT_EXISTS]: {
			status: 'Фискальный накопитель не подключен',
			head: 'Подключите фискальный накопитель',
			description: 'Подключите фискальный накопитель для регистрации кассы в налоговой и работы по новым правилам 54 ФЗ',
			cssClassStatusReg: 'fn_no_connected',
			cssClass: 'red'
		}
	},
	[KASSA_STATUS.NOT_REGISTERED]: {
		[SERVER_STATUS.NOT_EXISTS]: {
			status: 'Требуется регистрация в ФНС',
			head: 'Касса не поставлена на учет в налоговой',
			description: 'Зарегистрируйте кассу, чтобы начать передавать данные по новым правилам 54 ФЗ.',
			button: 'Зарегистрировать',
			cssClassStatusReg: 'no_registered',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.DRAFT]: {
			status: 'Требуется регистрация в ФНС',
			head: 'Касса не поставлена на учет в налоговой',
			description: 'Зарегистрируйте кассу, чтобы начать передавать данные по новым правилам 54 ФЗ.',
			button: 'Зарегистрировать',
			cssClassStatusReg: 'no_registered',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.STARTED]: {
			status: 'Требуется регистрация в ФНС',
			head: 'Касса не поставлена на учет в налоговой',
			description: 'Зарегистрируйте кассу, чтобы начать передавать данные по новым правилам 54 ФЗ.',
			button: 'Зарегистрировать',
			cssClassStatusReg: 'no_registered',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.OFD_WAIT_DECL_SIGN]: {
			status: 'Требуется подпись',
			head: 'Заявление ожидает подписи',
			description: 'Воспользуйтесь электронной подписью, чтобы отправить заявление о регистрации в налоговую.',
			button: 'Подписать',
			cssClassStatusReg: 'sign_required',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.DECL_SIGNING]: {
			status: 'Выполняется подпись',
			head: 'Заявление в процессе подписания',
			cssClassStatusReg: 'waiting_fns_answer',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.OFD_WAIT_IRUD]: {
			status: 'Ожидание ответа ФНС',
			head: 'Заявление на регистрацию кассы передано в налоговую',
			description: 'Ожидайте результат обработки заявления на электронную почту и телефон.',
			cssClassStatusReg: 'waiting_fns_answer',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.OFD_WAIT_RNM]: {
			status: 'Ожидание ответа ФНС',
			head: 'Заявление на регистрацию кассы передано в налоговую',
			description: 'Ожидайте результат обработки заявления на электронную почту и телефон.',
			cssClassStatusReg: 'waiting_fns_answer',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.OFD_WAIT_REPORT]: {
			status: 'Требуется отчет о регистрации',
			head: 'Налоговая ожидает отчет о регистрации',
			description: 'Отправьте отчет для завершения регистрации кассы.',
			button: 'Отправить',
			cssClassStatusReg: 'reg_report_required',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.REPORT_PRINTED]: {
			status: 'Ожидание отчета',
			head: 'Формируется отчет о регистрации',
			description: 'Ожидайте результат формирования отчета на электронную почту и телефон.',
			cssClassStatusReg: 'waiting_fns_answer',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.REPORT_PRINT_REQUESTED]: {
			status: 'Ожидание отчета',
			head: 'Формируется отчет о регистрации',
			description: 'Ожидайте результат формирования отчета на электронную почту и телефон.',
			cssClassStatusReg: 'waiting_fns_answer',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.REPORT_PRINT_ERROR]: {
			status: 'Ошибка в отчете',
			head: 'Не удалось сформировать отчет о регистрации',
			description: 'Отправьте отчет еще раз или обратитесь в службу поддержки по телефону: 8(800)100-6662',
			button: 'Отправить',
			cssClassStatusReg: 'error_report_reg',
			cssClass: 'red'
		},
		[SERVER_STATUS.OFD_WAIT_REPORT_SIGN]: {
			status: 'Требуется подпись',
			head: 'Отчет ожидает подписи',
			description: 'Воспользуйтесь электронной подписью, чтобы отправить отчет о регистрации в налоговую.',
			button: 'Подписать',
			cssClassStatusReg: 'sign_required',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.REPORT_SIGNING]: {
			status: 'Выполняется подпись',
			head: 'Отчет в процессе подписи',
			cssClassStatusReg: 'waiting_fns_answer',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.OFD_WAIT_FOR_FINAL_RESPONSE]: {
			status: 'Ожидание ответа ФНС',
			head: 'Отчет о регистрации передан в налоговую',
			description: 'Ожидайте результат обработки отчета на электронную почту и телефон',
			cssClassStatusReg: 'waiting_fns_answer',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.ERROR]: {
			status: 'Ошибка обработки ФНС',
			head: 'Ошибка в обработке документа',
			action: (retailPointID) => {
				return `
					Налоговая отклонила заявление о регистрации.
					<a href="/api/v1/retail-point/${retailPointID}/registration-request/error-doc" target="_blank">Скачайте уведомление</a>
					с причиной отказа.
				`;
			},
			button: 'Отправить повторно',
			cssClassStatusReg: 'error_report_reg',
			cssClass: 'red'
		},
		[SERVER_STATUS.REGISTERED]: {
			status: 'Зарегистрирована',
			head: 'Регистрация в налоговой завершена',
			description: 'Касса успешно поставлена на учет',
			cssClassStatusReg: 'registered_in_fns',
			cssClass: 'green'
		}
	},
	[KASSA_STATUS.REGISTERED]: {
		[SERVER_STATUS.OFD_WAIT_FOR_FINAL_RESPONSE]: {
			status: 'Ожидание ответа ФНС',
			head: 'Отчет о регистрации передан в налоговую',
			description: 'Ожидайте результат обработки отчета на электронную почту и телефон',
			cssClassStatusReg: 'waiting_fns_answer',
			cssClass: 'yellow'
		},
		[SERVER_STATUS.REPORT_PRINT_ERROR]: {
			status: 'Ошибка в отчете',
			head: 'Не удалось сформировать отчет о регистрации',
			description: 'Обратитесь в службу поддержки по телефону: 8(800)100-6662',
			cssClassStatusReg: 'error_report_reg',
			cssClass: 'red'
		},
		[SERVER_STATUS.ERROR]: {
			status: 'Ошибка обработки ФНС',
			head: 'Документ обработан с ошибкой',
			description: '', // TODO: текст ошибки от ОФД
			cssClassStatusReg: 'error_fns_processing',
			cssClass: 'red'
		},
		[SERVER_STATUS.REGISTERED]: {
			status: 'Зарегистрирована',
			head: 'Регистрация в налоговой завершена',
			description: 'Касса успешно поставлена на учет',
			cssClassStatusReg: 'registered_in_fns',
			cssClass: 'green'
		},
		OTHER_STATUS: {
			status: 'Поддерживает 54 ФЗ',
			head: 'Касса работает в фискальном режиме',
			description: 'Создайте чек в МодульКассе для проверки работы ОФД. Затем зайдите в личный кабинет ОФД и убедитесь, что чек успешно принят.',
			cssClassStatusReg: 'fiskalized',
			cssClass: 'green'
		}
	},
	[KASSA_STATUS.POS_VERSION_OUTDATED]: {
		status: 'Старая версия приложения',
		head: 'Дождитесь обновления МодульКассы',
		description: 'Кассовая программа обновится в ближайшее время.',
		cssClassStatusReg: 'old_soft',
		cssClass: 'red'
	}
};
*/

const LK_STATUS_KASSA = {
	[KASSA_STATUS.KKT_NOT_PLUGGED]: {
		status: 'Не подключена',
		head: 'Подключите оборудование',
		description: 'Касса не может печатать чеки, если ККТ не подключена.<br /><a href="http://modulkassa.ru/help/rabota-s-modulkassoy/modulkassa-na-android/podklyuchenie-oborudovaniya-android/podklyuchenie-fiskalnogo-registratora/" target="_blank">Подробнее о настройке.</a>',
		cssClass: 'red',
		cssClassStatusReg: 'no_connected',
	},
	[KASSA_STATUS.KKT_NOT_ENABLED_FOR_FZ54]: {
		status: 'Не поддерживает 54 ФЗ',
		head: 'Проверьте модель в реестре налоговой',
		description: 'Касса не передает данные по новым правилам 54 ФЗ. Уточните разрешенные ККТ <a href="http://kkt-online.nalog.ru" target="_blank">в реестре налоговой</a>.',
		cssClassStatusReg: 'no_fz-54',
		cssClass: 'red'
	},
	[KASSA_STATUS.FN_NOT_PLUGGED]: {
		status: 'Фискальный накопитель не подключен',
		head: 'Подключите фискальный накопитель',
		description: 'Подключите фискальный накопитель для регистрации кассы в налоговой и работы по новым правилам 54 ФЗ',
		cssClassStatusReg: 'fn_no_connected',
		cssClass: 'red'
	},
	[KASSA_STATUS.POS_VERSION_OUTDATED]: {
		status: 'Старая версия приложения',
		head: 'Дождитесь обновления МодульКассы',
		description: 'Кассовая программа обновится в ближайшее время.',
		cssClassStatusReg: 'old_soft',
		cssClass: 'red'
	}
};
const LK_STATUS_SERVER = {
	[SERVER_STATUS.NOT_EXISTS]: {
		status: 'Требуется регистрация в ФНС',
		head: 'Касса не поставлена на учет в налоговой',
		description: 'Зарегистрируйте кассу, чтобы начать передавать данные по новым правилам 54 ФЗ.',
		button: 'Зарегистрировать',
		cssClassStatusReg: 'no_registered',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.DRAFT]: {
		status: 'Требуется регистрация в ФНС',
		head: 'Касса не поставлена на учет в налоговой',
		description: 'Зарегистрируйте кассу, чтобы начать передавать данные по новым правилам 54 ФЗ.',
		button: 'Зарегистрировать',
		cssClassStatusReg: 'no_registered',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.STARTED]: {
		status: 'Требуется регистрация в ФНС',
		head: 'Касса не поставлена на учет в налоговой',
		description: 'Зарегистрируйте кассу, чтобы начать передавать данные по новым правилам 54 ФЗ.',
		button: 'Зарегистрировать',
		cssClassStatusReg: 'no_registered',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.OFD_WAIT_DECL_SIGN]: {
		status: 'Требуется подпись',
		head: 'Заявление ожидает подписи',
		description: 'Воспользуйтесь электронной подписью, чтобы отправить заявление о регистрации в налоговую.',
		button: 'Подписать',
		cssClassStatusReg: 'sign_required',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.DECL_SIGNING]: {
		status: 'Выполняется подпись',
		head: 'Заявление в процессе подписи',
		cssClassStatusReg: 'waiting_fns_answer',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.OFD_WAIT_IRUD]: {
		status: 'Ожидание ответа ФНС',
		head: 'Заявление на регистрацию кассы передано в налоговую',
		description: 'Ожидайте результат обработки заявления на электронную почту и телефон.',
		cssClassStatusReg: 'waiting_fns_answer',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.OFD_WAIT_RNM]: {
		status: 'Ожидание ответа ФНС',
		head: 'Заявление на регистрацию кассы передано в налоговую',
		description: 'Ожидайте результат обработки заявления на электронную почту и телефон.',
		cssClassStatusReg: 'waiting_fns_answer',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.OFD_WAIT_REPORT]: {
		status: 'Требуется отчет о регистрации',
		head: 'Налоговая ожидает отчет о регистрации',
		description: 'Отправьте отчет для завершения регистрации кассы.',
		button: 'Отправить',
		cssClassStatusReg: 'reg_report_required',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.REPORT_PRINTED]: {
		status: 'Ожидание отчета',
		head: 'Формируется отчет о регистрации',
		description: 'Ожидайте результат формирования отчета на электронную почту и телефон.',
		cssClassStatusReg: 'waiting_fns_answer',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.REPORT_PRINT_REQUESTED]: {
		status: 'Ожидание отчета',
		head: 'Формируется отчет о регистрации',
		description: 'Ожидайте результат формирования отчета на электронную почту и телефон.',
		cssClassStatusReg: 'waiting_fns_answer',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.REPORT_PRINT_ERROR]: {
		status: 'Ошибка в отчете',
		head: 'Не удалось сформировать отчет о регистрации',
		description: 'Отправьте отчет еще раз или обратитесь в службу поддержки по телефону: 8(800)100-6662',
		button: 'Отправить',
		cssClassStatusReg: 'error_report_reg',
		cssClass: 'red'
	},
	[SERVER_STATUS.OFD_WAIT_REPORT_SIGN]: {
		status: 'Требуется подпись',
		head: 'Отчет ожидает подписи',
		description: 'Воспользуйтесь электронной подписью, чтобы отправить отчет о регистрации в налоговую.',
		button: 'Подписать',
		cssClassStatusReg: 'sign_required',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.REPORT_SIGNING]: {
		status: 'Выполняется подпись',
		head: 'Отчет в процессе подписание',
		cssClassStatusReg: 'waiting_fns_answer',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.OFD_WAIT_FOR_FINAL_RESPONSE]: {
		status: 'Ожидание ответа ФНС',
		head: 'Отчет о регистрации передан в налоговую',
		description: 'Ожидайте результат обработки отчета на электронную почту и телефон',
		cssClassStatusReg: 'waiting_fns_answer',
		cssClass: 'yellow'
	},
	[SERVER_STATUS.ERROR]: {
		status: 'Ошибка обработки ФНС',
		head: 'Ошибка в обработке документа',
		action: (retailPointID) => {
			return `
					Налоговая отклонила заявление о регистрации.
					<a href="/api/v1/retail-point/${retailPointID}/registration-request/error-doc" target="_blank">Скачайте уведомление</a>
					с причиной отказа.
				`;
		},
		button: 'Отправить повторно',
		cssClassStatusReg: 'error_report_reg',
		cssClass: 'red'
	},
	[SERVER_STATUS.REGISTERED]: {
		status: 'Зарегистрирована',
		head: 'Регистрация в налоговой завершена',
		description: 'Касса успешно поставлена на учет',
		cssClassStatusReg: 'registered_in_fns',
		cssClass: 'green'
	}
};
export const getLkStatus = ({kktStatus, registrationRequestStatus}) => {
	const result = {};

	const KASSA_NOT_REGISTERED = [
		KASSA_STATUS.KKT_NOT_PLUGGED,
		KASSA_STATUS.KKT_NOT_ENABLED_FOR_FZ54,
		KASSA_STATUS.FN_NOT_PLUGGED,
		KASSA_STATUS.POS_VERSION_OUTDATED
	];
	const KASSA_REGISTERED = [
		KASSA_STATUS.NOT_REGISTERED,
		KASSA_STATUS.REGISTERED
	];
	const SERVER_REGISTERED = [
		SERVER_STATUS.NOT_EXISTS,
		SERVER_STATUS.DRAFT,
		SERVER_STATUS.STARTED,
		SERVER_STATUS.OFD_WAIT_DECL_SIGN,
		SERVER_STATUS.DECL_SIGNING,
		SERVER_STATUS.OFD_WAIT_IRUD,
		SERVER_STATUS.OFD_WAIT_RNM,
		SERVER_STATUS.OFD_WAIT_REPORT,
		SERVER_STATUS.REPORT_PRINT_REQUESTED,
		SERVER_STATUS.REPORT_PRINTED,
		SERVER_STATUS.REPORT_PRINT_ERROR,
		SERVER_STATUS.OFD_WAIT_FOR_FINAL_RESPONSE,
		SERVER_STATUS.OFD_WAIT_REPORT_SIGN,
		SERVER_STATUS.REPORT_SIGNING,
		SERVER_STATUS.ERROR,
		SERVER_STATUS.REGISTERED
	];
	const SUCCESS_FZ54 = {
		status: 'Поддерживает 54 ФЗ',
		head: 'Касса работает в фискальном режиме',
		description: 'Создайте чек в МодульКассе для проверки работы ОФД. Затем зайдите в личный кабинет ОФД и убедитесь, что чек успешно принят.',
		cssClassStatusReg: 'fiskalized',
		cssClass: 'green'
	};

	// блокирующий статус кассы
	if (KASSA_NOT_REGISTERED.includes(kktStatus)) {
		return LK_STATUS_KASSA[kktStatus];
	}

	// заявка в другом ОФД
	if (KASSA_STATUS.REGISTERED === kktStatus && SERVER_STATUS.NOT_EXISTS === registrationRequestStatus) {
		return SUCCESS_FZ54;
	}

	// допускающие регистрацию
	if (KASSA_REGISTERED.includes(kktStatus)) {
		// статус сервера разрешающий регистрацию
		if (SERVER_REGISTERED.includes(registrationRequestStatus)) {
			return LK_STATUS_SERVER[registrationRequestStatus];
		}

		// на случай другова типа регистрации
		if (SERVER_STATUS.REGISTERED === registrationRequestStatus) {
			return SUCCESS_FZ54;
		}
	}

	return result;
};

export const getKassaStatus = ({ kktStatus, registrationRequestStatus}) => {
	return kktStatus != KASSA_STATUS.KKT_NOT_PLUGGED;
};

export const SHOW_STATUS_REG_BLOCK_WITH = [
	SERVER_STATUS.OFD_WAIT_REPORT,
	SERVER_STATUS.OFD_WAIT_REPORT_SIGN,
	SERVER_STATUS.OFD_WAIT_DECL_SIGN,
	SERVER_STATUS.REPORT_PRINT_ERROR,
	SERVER_STATUS.ERROR,
	SERVER_STATUS.NOT_EXISTS,
	SERVER_STATUS.DRAFT
];

export const NO_INTEGRATION_MY_SKLAD_STATUS = [
	SERVER_STATUS.STARTED,
	SERVER_STATUS.OFD_WAIT_DECL_SIGN,
	SERVER_STATUS.OFD_WAIT_IRUD,
	SERVER_STATUS.OFD_WAIT_RNM,
	SERVER_STATUS.OFD_WAIT_REPORT,
	SERVER_STATUS.REPORT_PRINT_REQUESTED,
	SERVER_STATUS.OFD_WAIT_REPORT_SIGN,
	SERVER_STATUS.ERROR,
	SERVER_STATUS.OFD_WAIT_FOR_FINAL_RESPONSE,
	SERVER_STATUS.REPORT_PRINT_ERROR,
	SERVER_STATUS.ERROR
];

export const STATUS_CHECK_SERVER = [
	SERVER_STATUS.STARTED,
	SERVER_STATUS.DECL_SIGNING,
	SERVER_STATUS.OFD_WAIT_IRUD,
	SERVER_STATUS.OFD_WAIT_RNM,
	SERVER_STATUS.REPORT_PRINTED,
	SERVER_STATUS.REPORT_PRINT_REQUESTED,
	SERVER_STATUS.REPORT_SIGNING,
	SERVER_STATUS.OFD_WAIT_FOR_FINAL_RESPONSE
];

export const OK_DELETE_RP = [
	SERVER_STATUS.NOT_EXISTS,
	SERVER_STATUS.DRAFT,
	SERVER_STATUS.ERROR,
	SERVER_STATUS.REGISTERED
];