const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const REQUEST_PIPE = {REQUEST, SUCCESS, FAILURE};

/**
 * Формируется группа из actions для работы с сервером
 * @param base
 * @returns {REQUEST_PIPE}
 */
export function createRequestTypes(base) {
	return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`;
		return acc
	}, {});
}

/**
 * Балванка для создания action
 * @param type
 * @param payload
 * @returns {{type: *}}
 */
export function createAction(type, payload = {}) {
	return {type, ...payload}
}
