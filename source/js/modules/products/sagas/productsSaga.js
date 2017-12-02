import {call, put, takeLatest, takeEvery, select, all} from 'redux-saga/effects';
import {debounceFor} from 'redux-saga-debounce-effect';
import * as actions from '../enums/actions';
import * as productActions from '../actions/productActions';
import * as dataContext from '../dataProvider/productDataContext';
import {getPointId} from 'modules/core/selectors';
import * as selectors from '../selectors/productsSelectors'
import {isServerError} from 'infrastructure/helpers/errorHelper'

function* getProducts() {
	try {
		let filterModel = yield select(selectors.getFilter);
		const {filter, start, count, sortField, sortDirection}=filterModel.toJS();
		const retailPointId = yield select(getPointId);
		const {pos, totalCount, productsList} = yield call(dataContext.getProducts, {
			retailPointId,
			start,
			count,
			filter,
			sortField,
			sortDirection
		});
		yield put(productActions.getProducts.success({pos, totalCount, productsList}));
		yield put(productActions.correctFilter({pos}));
	}
	catch (error) {
		yield put(productActions.getProducts.failure(error));
		if (!isServerError(error))
			throw error;
	}
}

function* importProducts({file}) {
	try {
		const response = yield call(dataContext.uploadProducts, file);
		yield put(productActions.uploadImportProducts.success({response}));
		yield call(getProducts);
	}
	catch (error) {
		yield put(productActions.uploadImportProducts.failure({error}));
	}
}

export default function*() {
	yield all([
		takeLatest(actions.GET_PRODUCTS.REQUEST, getProducts),
		debounceFor(actions.SEARCH_PRODUCT_IN_LIST, getProducts, 700),
		takeEvery(actions.IMPORT_PRODUCTS.REQUEST, importProducts)
	])
}