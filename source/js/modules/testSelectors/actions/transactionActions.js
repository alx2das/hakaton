import {SET_FILTER, SET_COMPLETED} from '../enums/actions'

export function setFilter(listId, filterState) {
	return {
		type: SET_FILTER,
		listId,
		filterState
	};
}

export function setCompleted(listId) {
	return {
		type: SET_COMPLETED,
		payload: {listId}
	};
}

export function setData({key, data}) {
	return {
		type: 'SET_DATA',
		key, data
	};
}