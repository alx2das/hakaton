// Reducers
import RegisterKKTReducer from './reducers/registerKKTReducer'

// Sagas
import RegisterKKTSaga from './saga/registerKKTSaga'

// Components for Routes
import RegisterKKTContainer from './containers/RegisterKKT/index'



export function getReducers(createReducer) {
	return {
		testRegisterKKT: RegisterKKTReducer(createReducer)
	}
}

export function getSagas() {
	return [
		RegisterKKTSaga()
	]
}

export function getRoutes() {
	return {
		testRegisterKKT: {
			path: '/testing/register-kkt',
			exact: true,
			allowAnonymous: true,
			component: RegisterKKTContainer
		}
	}
}