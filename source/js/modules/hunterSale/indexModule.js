import * as routes  from './routes.js'

// Reducers
import statisticReduce from './reducers/statisticReducer'

// Sagas
import statisticSaga from './sagas/statisticSaga'


export function getReducers(createReducer) {
	return {
		statistic: statisticReduce(createReducer)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
        statisticSaga()
	]
}