export const SHIFT_TYPE = {
	EXTERNAL: ':external'
};

export const DOCUMENT_STATUS = {
	PENDING: 'PENDING',
	PRINTED: 'PRINTED',
	COMPLETED: 'COMPLETED',
	FAILED: 'FAILED',
	QUEUED: 'QUEUED',
	WAIT_FOR_CALLBACK: 'WAIT_FOR_CALLBACK',
};

export const DOCUMENT_STATUS_NAMES = {
	[DOCUMENT_STATUS.PENDING]: 'В обработке',
	[DOCUMENT_STATUS.PRINTED]: 'Фискализирован',
	[DOCUMENT_STATUS.COMPLETED]: 'Выполнен',
	[DOCUMENT_STATUS.FAILED]: 'Ошибка',
	[DOCUMENT_STATUS.QUEUED]: 'В очереди',
	[DOCUMENT_STATUS.WAIT_FOR_CALLBACK]: 'Доставка ответа на сайт',
};

export const DOCUMENT_TYPE = {
	SALE: 'SALE',
	SALE_BY_SOFT: 'SALE_BY_SOFT',
	RETURN: 'RETURN',
	RETURN_BY_SALE: 'RETURN_BY_SALE',
	CASH_IN: 'CASH_IN',
	CASH_OUT: 'CASH_OUT'
};

export const DOCUMENT_TYPE_NAMES = {
	[DOCUMENT_TYPE.SALE]: 'Продажа',
	[DOCUMENT_TYPE.SALE_BY_SOFT]: 'Продажа',
	[DOCUMENT_TYPE.RETURN]: 'Возврат',
	[DOCUMENT_TYPE.RETURN_BY_SALE]: 'Возврат',
	[DOCUMENT_TYPE.CASH_IN]: 'Внесение',
	[DOCUMENT_TYPE.CASH_OUT]: 'Выем'
};

export const getDocStatusName = status => {
	const statusKey = (status || '').toUpperCase();
	return DOCUMENT_STATUS_NAMES[statusKey] || '--';
};

export const getDocTypeName = type => {
	const typeKey = (type || '').toUpperCase();
	return DOCUMENT_TYPE_NAMES[typeKey] || '--';
};