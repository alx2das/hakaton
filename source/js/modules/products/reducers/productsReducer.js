import {
	GET_PRODUCTS, SEARCH_PRODUCT_IN_LIST, RESET_PRODUCTS_LIST,
	ADD_PRODUCT_TO_LIST, UPDATE_PRODUCT_IN_LIST, REMOVE_PRODUCT, SET_FILTER, CORRECT_FILTER
} from '../enums/actions';
import {Map, List, fromJS} from 'immutable';

export const initialState = Map({
	loading: true,
	error: null,
	productsList: List([]),
	productsFilter: Map({
		start: 0,
		totalCount: null,
		count: null,
		filter: ''
	})
});

export const actionHandlers = {

	[GET_PRODUCTS.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			error: null
		});
	},
	[SEARCH_PRODUCT_IN_LIST]: (state, action) => {
		return state.merge({loading: true, error: null});
	},

	[SET_FILTER]: (state, {filter}) => {
		const oldFilter = state.getIn(['productsFilter']).toJS();
		if (filter.restart) {
			oldFilter.start = 0;
			oldFilter.totalCount = null;
		}

		Object.keys(filter).forEach(key => {
			oldFilter[key] = filter[key];
		});

		return state.mergeIn(['productsFilter'], fromJS(oldFilter));
	},

	[CORRECT_FILTER]: (state, {pos}) => {
		const count = state.getIn(['productsFilter', 'count'], 0);
		return state.setIn(['productsFilter', 'start'], pos + count);
	},

	[GET_PRODUCTS.SUCCESS]: (state, {pos, totalCount, productsList}) => {
		const filter = state.getIn(['productsFilter', 'filter']);
		return state.merge({
			loading: false,
			error: null,
			productsList: pos > 0 ? state.get('productsList').concat(fromJS(productsList)) : fromJS(productsList),
		}).setIn(['productsFilter', 'totalCount'], totalCount);
	},

	[GET_PRODUCTS.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: fromJS(action.error),
		});
	},

	[ADD_PRODUCT_TO_LIST]: (state, {product}) => {
		return state.merge({
			productsList: state.get('productsList').unshift(fromJS(product))
		}).updateIn(['productsFilter', 'totalCount'], t => t + 1);
	},

	[UPDATE_PRODUCT_IN_LIST]: (state, {product}) => {
		const entry = state.get('productsList').findEntry(s => s.get('inventCode') == product.inventCode);
		return entry ? state.updateIn(['productsList', entry[0]], m => m.merge(fromJS(product))) : state;
	},

	[RESET_PRODUCTS_LIST]: (state) => {
		return state.setIn(['productsList'], List([]))
	},

	[REMOVE_PRODUCT.SUCCESS]: (state, {inventCode}) => {
		let productsList = state.get('productsList');
		const entry = productsList.findEntry(s => s.get('inventCode') == inventCode);
		if (entry) {
			productsList = productsList.delete(entry[0]);
			return state.merge({productsList: productsList})
				.updateIn(['productsFilter', 'totalCount'], t => t - 1);
		}
		return state;
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
