import * as listReducer from './reducers/contragentListReducer'
import * as editReducer from './reducers/contragentEditReducer'
import * as routes  from './routes.js'
import contragentSaga from './sagas/contragentSaga'

export function getReducers(createReducer) {
	return {
		listContragent: createReducer(listReducer.initialState, listReducer.actionHandlers),
		editContragent: createReducer(editReducer.initialState, editReducer.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		contragentSaga()
	]
}