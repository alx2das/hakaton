import * as secondReducer from './reducers/secondReducer'
import * as routes  from './routes.js'

export function getReducers(createReducer) {
	return {
		transactions: createReducer(secondReducer.initialState, secondReducer.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}
