import * as reducers from './reducers/reducers'
import * as routes  from './routes.js'
import sagas from './sagas/sagas';

export function getReducers(createReducer) {
	return {
		finance: createReducer(reducers.initialState, reducers.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [sagas()]
}