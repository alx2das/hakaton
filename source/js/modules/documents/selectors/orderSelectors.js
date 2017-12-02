import {createSelector} from 'reselect'
import {getFormValues} from 'redux-form/immutable'
export const getSection = (state) => {
	return state.get('orders');
};

export const getOrders = createSelector([getSection], (section) => {
	return section ? section.get('orders') : null;
});


export const getLoader = createSelector([getSection], (section) => {
	return section ? section.get('loading') : false;
});

export const getOrderFormSection = createSelector([getSection], (section) => {
	return section.get('createOrder');
});

export const getOrdersFilter = createSelector([getSection], (section) => {
	return section.get('ordersFilter');
});

export const getOrdersTotalCount = createSelector([getOrdersFilter], (filter) => {
	return filter.get('totalCount');
});

export const getFormProducts = createSelector([getOrderFormSection], (section) => {
	return section.get('products').toList();
});

export const getFormFlags = createSelector([getOrderFormSection], (section) => {
	return {
		saved: section.get('saved'),
		saving: section.get('saving'),
		error: section.get('error'),
		orderNewNumber: section.get('orderNewNumber')
	}
});

export const getFormTotalSum = createSelector([getFormProducts], (products) => {
	return products.reduce((sum, product) => sum + product.get('posSum'), 0);
});

export const getFormSearchProducts = createSelector([getOrderFormSection], (section) => {
	return section.get('searchProductsResult');
});

export const getFormError = createSelector([getOrderFormSection], (section) => {
	return section.get('error');
});
