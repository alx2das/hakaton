import * as orderReducers from './reducers/orderReducers'
import chequeReducers from './reducers/chequeReducers'
import moneyReducers from './reducers/moneyReducers'
import * as shopDocsReducers from './reducers/shopDocsReducers'
import reportReducers from './reducers/reportReducers'

import * as routes from './routes.js'
import orderSagas from './sagas/orderSagas';
import chequeSagas from './sagas/chequeSagas';
import moneySaga from './sagas/moneySagas'
import shopDocSagas from './sagas/shopDocSagas';
import reportSaga from './sagas/reportSagas'

export function getReducers(createReducer) {
	return {
		orders: createReducer(orderReducers.initialState, orderReducers.actionHandlers),
		cheques: chequeReducers(createReducer),
		money: moneyReducers(createReducer),
		iShopDocs: createReducer(shopDocsReducers.initialState, shopDocsReducers.actionHandlers),
		report: reportReducers(createReducer)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		orderSagas(),
		chequeSagas(),
		moneySaga(),
		shopDocSagas(),
		reportSaga()
	]
}