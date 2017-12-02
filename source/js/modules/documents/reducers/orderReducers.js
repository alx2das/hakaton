import {Map, List, fromJS} from 'immutable';
import * as actions from '../actions/orderActions';
import createRequestReducer from 'modules/core/reducers/createRequestReducer'
import {create} from '../dataProvider/inventPositionFactory';

export const initialState = Map({
	loading: false,
	totalCount: 0,
	pos: 0,
	orders: List([]),
	error: null,
	ordersFilter: Map({
		start: 0,
		totalCount: null,
		count: null
	}),
	createOrder: Map({
		orderNewNumber: undefined,
		products: Map({}),
		error: null,
		saving: false,
		saved: false,
		searchProductsResult: Map({
			loading: false,
			error: null,
			products: List([])
		})
	}),
	orderViews: Map({})
});

const searchProductReducer = createRequestReducer(actions.SEARCH_PRODUCTS, ['createOrder', 'searchProductsResult'])
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
	[actions.GET_ORDERS.REQUEST]: (state, action) => {
		return state.merge({loading: true});
	},
	[actions.SEARCH_ORDERS]: (state, action) => {
		return state.merge({loading: true});
	},
	[actions.GET_ORDERS.SUCCESS]: (state, {totalCount, pos, orders}) => {
		const filter = state.getIn(['ordersFilter', 'filter']);
		return state.merge({
			loading: false,
			orders: pos > 0 ? state.get('orders').concat(fromJS(orders)) : fromJS(orders)
		}).setIn(['ordersFilter', 'totalCount'], totalCount);
	},
	[actions.GET_ORDERS.FAILURE]: (state, {error}) => {
		return state.merge({loading: false, error: fromJS(error)});
	},
	[actions.ADD_PRODUCT]: (state, {product}) => {
		const inventPosition = create(product);
		const positions = state.getIn(['createOrder', 'products']);
		inventPosition.posNum = positions.size;
		return state.updateIn(['createOrder', 'products'], products => products.setIn([inventPosition.id], fromJS(inventPosition)));
	},
	[actions.REMOVE_PRODUCT]: (state, {id}) => {
		return state.updateIn(['createOrder', 'products'], products => products.delete(id));
	},
	[actions.CREATE_ORDER.REQUEST]: (state) => {
		return state.updateIn(['createOrder', 'saving'], saving => true);
	},
	[actions.CREATE_ORDER.SUCCESS]: (state, {order}) => {
		return state
			.mergeIn(['createOrder'], {saving: false, error: null, saved: true})
			.updateIn(['orders'], orders => orders.unshift(fromJS(order)))
			.updateIn(['ordersFilter', 'totalCount'], count => (count || 0) + 1);
	},
	[actions.CREATE_ORDER.FAILURE]: (state, {error}) => {
		return state.mergeIn(['createOrder'], {saving: false, error: fromJS(error)});
	},

	[actions.DELETE_ORDER]: (state, {id}) => {
		return state
			.setIn(['orderViews', id], fromJS({close: true}))
			.updateIn(['orders'], orders => orders.filter((e) => e.get('id') !== id));
	},

	[actions.GET_ORDER_NEW_NUMBER.REQUEST]: (state) => {
		return state.setIn(['createOrder', 'orderNewNumber'], undefined);
	},
	[actions.GET_ORDER_NEW_NUMBER.SUCCESS]: (state, {number}) => {
		return state.setIn(['createOrder', 'orderNewNumber'], number);
	},

	[actions.RESET_ORDER]: (state) => {
		return state.mergeIn(['createOrder'], initialState.get('createOrder'));
	},

	[actions.SET_ORDERS_FILTER]: (state, {filter}) => {
		if (filter.restart) {
			const newFilter = filter;
			newFilter.start = 0;
			newFilter.totalCount = null;
			return state.mergeIn(['ordersFilter'], fromJS(newFilter));
		}
		return state.mergeIn(['ordersFilter'], fromJS(filter));
	},
	[actions.CORRECT_FILTER]: (state, {pos}) => {
		const count = state.getIn(['ordersFilter', 'count'], 0);
		return state.setIn(['ordersFilter', 'start'], pos + count);
	},
	[actions.GET_ORDER_DETAILS.REQUEST]: (state, {id}) => {
		return state.setIn(['orderViews', id], fromJS({loading: true}));
	},
	[actions.GET_ORDER_DETAILS.SUCCESS]: (state, {order}) => {
		return state.mergeIn(['orderViews', order.id], fromJS({loading: false, order}));
	},
	[actions.GET_ORDER_DETAILS.FAILURE]: (state, {id, error}) => {
		return state.mergeIn(['orderViews', id], fromJS({loading: false, error}));
	},
	...searchProductReducer,
};

export default (createReducer) => createReducer(initialState, actionHandlers);
