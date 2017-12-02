import * as listReducers from './reducers/discountListReducer'
import * as editReducers from './reducers/discountEditReducer'
import * as routes  from './routes.js'
import discountSaga from './saga/discountSaga';

export function getReducers(createReducer) {
	return {
		listDiscount: createReducer(listReducers.initialState, listReducers.actionHandlers),
		editDiscount: createReducer(editReducers.initialState, editReducers.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		discountSaga()
	]
}