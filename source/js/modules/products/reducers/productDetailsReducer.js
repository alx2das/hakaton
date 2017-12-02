import {
	GET_PRODUCT_DETAIL, SAVE_PRODUCT_DETAIL, SEARCH_PRODUCTS,
	SET_DEFAULT_SEARCH_PRODUCT, ADD_PRODUCT_DETAIL, REMOVE_PRODUCT
} from '../enums/actions';
import {Map, fromJS} from 'immutable';
import createRequestReducer from 'modules/core/reducers/createRequestReducer'

export const initialState = Map({
	productView: Map({}),
	modifierGroups: Map({}),
	searchProductsResult: Map({}), //результаты поиска в выпадушке
});

const searchProductReducer = createRequestReducer(SEARCH_PRODUCTS, ['searchProductsResult'])
	.setRequest((data) => data.merge({loading: true}))
	.setFailure((data, {error}) => data.merge({
		loading: false,
		error: fromJS(error)
	}))
	.setSuccess((data, {products}) => data.merge({
		loading: false,
		products: fromJS(products),
		error: null
	}))
	.get();

export const actionHandlers = {

	[GET_PRODUCT_DETAIL.REQUEST]: (state, {inventCode}) => {
		return state.setIn(['productView', inventCode],
			Map({
				loading: true,
				product: null,
				error: null,
				saving: false,
				saved: false,
				removing: false,
				removed: false
			}));
	},

	[GET_PRODUCT_DETAIL.SUCCESS]: (state, {product}) => {
		return state.setIn(['productView', product.inventCode],
			Map({
				loading: false,
				product: fromJS(product),
				error: null
			}));
	},

	[GET_PRODUCT_DETAIL.FAILURE]: (state, {inventCode, error}) => {
		return state.setIn(['productView', inventCode],
			Map({
				loading: false,
				product: null,
				error: fromJS(error)
			}));
	},

	[SAVE_PRODUCT_DETAIL.REQUEST]: (state, {inventCode}) => {
		return state.setIn(['productView', inventCode, 'saving'], true);
	},

	[SAVE_PRODUCT_DETAIL.SUCCESS]: (state, {inventCode}) => {
		return state.updateIn(['productView', inventCode],
			view => view.merge(fromJS({
				saving: false,
				saved: true
			})));
	},

	[SAVE_PRODUCT_DETAIL.FAILURE]: (state, {inventCode, error}) => {
		return state.updateIn(['productView', inventCode], view => view.merge(fromJS({
			error: error,
			saving: false,
			saved: false
		})));
	},

	[SET_DEFAULT_SEARCH_PRODUCT]: (state, {formKey, defaultsProduct}) => {
		return state.updateIn(['searchProductsResult', formKey], Map({}), data => data.merge({
			loading: false,
			error: null,
			products: fromJS(defaultsProduct)
		}));
	},

	[ADD_PRODUCT_DETAIL]: (state, {product}) => {
		return state.setIn(['productView', product.inventCode],
			Map({
				loading: false,
				product: fromJS(product),
				error: null
			}));
	},

	[REMOVE_PRODUCT.REQUEST]: (state, {inventCode}) => {
		return state.setIn(['productView', inventCode, 'removing'], true);
	},

	[REMOVE_PRODUCT.SUCCESS]: (state, {inventCode}) => {
		return state.updateIn(['productView', inventCode], map => map.merge({
			removing: false,
			removed: true
		}));
	},

	[REMOVE_PRODUCT.FAILURE]: (state, {inventCode, error}) => {
		return state.updateIn(['productView', inventCode], map => map.merge({
			removing: false,
			removed: false,
			error: fromJS(error)
		}));
	},
	...searchProductReducer,
};


export default (createReducer) => createReducer(initialState, actionHandlers);
