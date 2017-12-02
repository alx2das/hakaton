import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers';

export const getProducts = {
	request: () => createAction(actions.GET_PRODUCTS.REQUEST),
	success: ({pos, totalCount, productsList}) => createAction(actions.GET_PRODUCTS.SUCCESS, {
		pos,
		totalCount,
		productsList
	}),
	failure: (error) => createAction(actions.GET_PRODUCTS.FAILURE, {error})
};

export const searchProductList = () => createAction(actions.SEARCH_PRODUCT_IN_LIST);
export const setFilter = ({filter}) => createAction(actions.SET_FILTER, {filter});
export const correctFilter = ({pos}) => createAction(actions.CORRECT_FILTER, {pos});

export const getProductDetails = {
	request: ({inventCode, point}) => createAction(actions.GET_PRODUCT_DETAIL.REQUEST, {
		inventCode,
		point
	}),
	success: ({product}) => createAction(actions.GET_PRODUCT_DETAIL.SUCCESS, {product}),
	failure: ({inventCode, error}) => createAction(actions.GET_PRODUCT_DETAIL.FAILURE, {inventCode, error})
};


export const saveProductDetails = {
	request: ({point, product, inventCode}) => createAction(actions.SAVE_PRODUCT_DETAIL.REQUEST, {
		point,
		product,
		inventCode
	}),
	success: ({product, inventCode}) => createAction(actions.SAVE_PRODUCT_DETAIL.SUCCESS, {inventCode}),
	failure: ({inventCode, error}) => createAction(actions.SAVE_PRODUCT_DETAIL.FAILURE, {inventCode, error})
};

export const removeProduct = {
	request: ({point, inventCode}) => createAction(actions.REMOVE_PRODUCT.REQUEST, {
		point,
		inventCode
	}),
	success: ({point, inventCode}) => createAction(actions.REMOVE_PRODUCT.SUCCESS, {point, inventCode}),
	failure: ({inventCode, point, error}) => createAction(actions.REMOVE_PRODUCT.FAILURE, {inventCode, point, error})
};

export const addProductToList = ({product}) => createAction(actions.ADD_PRODUCT_TO_LIST, {product});
export const updateProductInList = ({product}) => createAction(actions.UPDATE_PRODUCT_IN_LIST, {product});


export const searchProducts = {
	request: ({formKey, query}) => createAction(actions.SEARCH_PRODUCTS.REQUEST, {formKey, query}),
	success: ({formKey, products}) => createAction(actions.SEARCH_PRODUCTS.SUCCESS, {formKey, products}),
	failure: ({formKey, error}) => createAction(actions.SEARCH_PRODUCTS.FAILURE, {formKey, error})
};

export const setDefaultSearchProduct = ({formKey, defaultsProduct}) => createAction(actions.SET_DEFAULT_SEARCH_PRODUCT, {
	formKey,
	defaultsProduct
});

export const resetProductsList = () => createAction(actions.RESET_PRODUCTS_LIST);
export const addProduct = ({product}) => createAction(actions.ADD_PRODUCT_DETAIL, {product});

export const createProduct = () => createAction(actions.CREATE_PRODUCT);
export const setNewProduct = ({inventCode}) => createAction(actions.SET_NEW_PRODUCT, {inventCode});

export const uploadImportProducts = {
	request: ({file}) => createAction(actions.IMPORT_PRODUCTS.REQUEST, {file}),
	success: ({response}) => createAction(actions.IMPORT_PRODUCTS.SUCCESS, {response}),
	failure: ({error}) => createAction(actions.IMPORT_PRODUCTS.FAILURE, {error})
};

export const resetImportProducts = () => createAction(actions.RESET_IMPORT_LIST);

