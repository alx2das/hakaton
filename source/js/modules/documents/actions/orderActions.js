import {createAction} from 'infrastructure/helpers/actionHelpers'

import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

export const GET_ORDERS = createRequestTypes('DOCUMENTS.GET_ORDERS');
export const GET_ORDER_DETAILS = createRequestTypes('DOCUMENTS.GET_ORDER_DETAILS');
export const DELETE_ORDER = 'DOCUMENTS.DELETE_ORDER';
export const CREATE_ORDER = createRequestTypes('DOCUMENTS.CREATE_ORDER');
export const ADD_PRODUCT = 'DOCUMENTS.ADD_PRODUCT';
export const SET_ORDERS_FILTER = 'DOCUMENTS.SET_ORDERS_FILTER';
export const SEARCH_ORDERS = 'DOCUMENTS.SEARCH_ORDERS';
export const CORRECT_FILTER = 'DOCUMENTS.CORRECT_FILTER';
export const REMOVE_PRODUCT = 'DOCUMENTS.REMOVE_PRODUCT';
export const SEARCH_PRODUCTS = createRequestTypes('DOCUMENTS.SEARCH_PRODUCTS');
export const RESET_ORDER = 'DOCUMENTS.RESET_ORDER';
export const GET_ORDER_NEW_NUMBER = createRequestTypes('DOCUMENTS.GET_ORDER_NEW_NUMBER'); //получение нового номера
/**
 * Получение списка заказов
 */
export const getOrders = {
	request: () => createAction(GET_ORDERS.REQUEST),
	success: ({pos, totalCount, orders, isFirst}) => createAction(GET_ORDERS.SUCCESS, {
		pos,
		totalCount,
		orders,
		isFirst
	}),
	failure: ({error}) => createAction(GET_ORDERS.FAILURE, {error})
};

export const setOrdersFilter = ({filter}) => createAction(SET_ORDERS_FILTER, {filter}); //count, filter, sortField, sortDirection

export const searchOrders = () => createAction(SEARCH_ORDERS);
export const correctFilter = ({pos}) => createAction(CORRECT_FILTER, {pos});

export const getOrderDetails = {
	request: ({id, point}) => createAction(GET_ORDER_DETAILS.REQUEST, {id, point}),
	success: ({order}) => createAction(GET_ORDER_DETAILS.SUCCESS, {order}),
	failure: ({id, error}) => createAction(GET_ORDER_DETAILS.FAILURE, {id, error})
};

export const deleteOrder = ({id}) => createAction(DELETE_ORDER, {id});

export const createOrder = {
	request: ({order, products}) => createAction(CREATE_ORDER.REQUEST, {order, products}),
	success: ({order}) => createAction(CREATE_ORDER.SUCCESS, {order}),
	failure: ({error}) => createAction(CREATE_ORDER.FAILURE, {error})
};

export const resetOrder = () => createAction(RESET_ORDER);

export const addProduct = ({product}) => createAction(ADD_PRODUCT, {product});
export const removeProduct = ({id}) => createAction(REMOVE_PRODUCT, {id});

export const searchProducts = {
	request: ({query}) => createAction(SEARCH_PRODUCTS.REQUEST, {query}),
	success: ({products}) => createAction(SEARCH_PRODUCTS.SUCCESS, {products}),
	failure: ({error}) => createAction(SEARCH_PRODUCTS.FAILURE, {error})
};

export const getOrderNewNumber = {
	request: () => createAction(GET_ORDER_NEW_NUMBER.REQUEST),
	success: ({number}) => createAction(GET_ORDER_NEW_NUMBER.SUCCESS, {number}),
	//failure: ({error}) => createAction(SEARCH_PRODUCTS.FAILURE, {error})
};

