import * as mapper from './cashBoxMapper'
import api from 'infrastructure/api/api'

const catalogType = 'HOT_KEYS';
/**
 * Получение табов с хоткеями
 * @returns {*|axios.Promise}
 */
export function getTabList(retailPointId, start, count) {
	return api.v1().retailpoint(retailPointId).catalog().hotkeys()
		.get({start, count})
		.then(response => mapper.toClientTabList(response.data));
}

export function createTab(retailPointId, tab) {
	return api.v1().retailpoint(retailPointId).catalog().post({
		catalogType: catalogType,
		...tab
	});
}

export function saveTab(retailPointId, tab) {
	const tabData = mapper.toServerTab(tab);
	return api.v1().retailpoint(retailPointId).catalog().put({
		catalogType: catalogType,
		...tabData
	});
}

export function removeTab(retailPointId, code) {
	return api.v1().retailpoint(retailPointId)
		.catalog()
		.hotkeys(code)
		.delete();
}