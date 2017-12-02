import * as routes  from './routes.js'
import * as productsReducer from './reducers/productsReducer'
import * as productDetailsReducer from './reducers/productDetailsReducer'
import * as productModifiersReducer from './reducers/productModifiersReducer'
import * as layersReducer from './reducers/layersReducer'
import * as importReducer from './reducers/importReducer'
import productsSaga from './sagas/productsSaga'
import productDetailsSaga from './sagas/productDetailsSaga'
import modifiersSaga from './sagas/modifiersSaga'

export function getReducers(createReducer) {
	return {
		products: createReducer(productsReducer.initialState, productsReducer.actionHandlers),
		productDetails: createReducer(productDetailsReducer.initialState, productDetailsReducer.actionHandlers),
		productModifiers: createReducer(productModifiersReducer.initialState, productModifiersReducer.actionHandlers),
		imports: createReducer(importReducer.initialState, importReducer.actionHandlers),
		layers: createReducer(layersReducer.initialState, layersReducer.actionHandlers)
	}
}

export function getRoutes() {
	return routes.getRoutes();
}

export function getSagas() {
	return [
		productsSaga(),
		productDetailsSaga(),
		modifiersSaga()
	];
}
