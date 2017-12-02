import regKKTReducer from './reducers/registerKKTReducer'
import * as retailPointsReducer from '../retailPoints/reducers/retailPointsReducer';
import * as routes  from './routes.js';
import sagas from './sagas/retailPointsSaga';
import regKKTSaga from './sagas/registerKKTSaga'


export function getReducers(createReducer) {
	return {
		retailPointsData: createReducer(retailPointsReducer.initialState, retailPointsReducer.actionHandlers),
		registerKKT: regKKTReducer(createReducer)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		sagas(),
		regKKTSaga()
	];
}
