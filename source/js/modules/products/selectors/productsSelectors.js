import {createSelector} from 'reselect'
import {Map, List} from 'immutable';

export const getProductsData = (state) => {
	return state.get('products');
};

export const getProductDetailSection = (state) => {
	return state.get('productDetails');
};

export const getImportData = (state) => {
	return state.get('imports');
};

export const getProductsList = createSelector([getProductsData], data => {
	return data.get('productsList');
});


export const getProductView = (inventCode) => createSelector([getProductDetailSection], data => {
	return data.getIn(['productView', inventCode], null);
});

export const getProductLoading = createSelector([getProductsData], data => {
	return data.get('loading');
});

export const getProductListError = createSelector([getProductsData], data => {
	return data.get('error');
});

export const getSearchProducts = (formKey) => createSelector([getProductDetailSection], data => {
	return data.getIn(['searchProductsResult', formKey], Map({
		loading: false,
		products: List([]),
		error: null
	}));
});

export const getFilter = createSelector([getProductsData], (section) => {
	return section.get('productsFilter');
});

export const getTotalCount = createSelector([getFilter], (filter) => {
	return filter.get('totalCount');
});
