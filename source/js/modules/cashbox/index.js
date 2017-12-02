import * as rootReducer from './reducers/rootReducer'
import * as routes  from './routes.js'
import sagas from './sagas/cashBoxSagas';

export function getReducers(createReducer) {
	return {
		cashBoxTabs: createReducer(rootReducer.initialState, rootReducer.actionHandlers),
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [sagas()]
}