import * as routes  from './routes.js'

// Reducers
import statisticReduce from './reducers/statisticReducer'
import optionsReduce from './reducers/optionsReducer'

// Sagas
import statisticSaga from './sagas/statisticSaga'
import optionsSaga from './sagas/optionsSaga'


export function getReducers(createReducer) {
	return {
		statistic: statisticReduce(createReducer),
		options: optionsReduce(createReducer)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
        statisticSaga(),
        optionsSaga()
	]
}