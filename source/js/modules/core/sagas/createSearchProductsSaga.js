import {call, put, select} from 'redux-saga/effects';
import {debounce} from 'redux-saga-debounce-effect'
import {getPointId} from '../selectors'
import * as dataContext from 'modules/products/dataProvider/productDataContext'
import {createAction} from 'infrastructure/helpers/actionHelpers'
import logger from 'infrastructure/utils/logger'

export default (ACTION) => {

	const searchSuccess = ({formKey, products}) => createAction(ACTION.SUCCESS, {formKey, products});
	const searchFailure = ({formKey, error}) => createAction(ACTION.FAILURE, {formKey, error});

	function* searchProducts({query, ...props}) {
		logger.log('starting search');
		try {
			const retailPointId = yield select(getPointId);
			const response = yield call(dataContext.getProducts, {retailPointId, start: 0, count: 100, filter: query});
			yield put(searchSuccess({...props, products: response.productsList}));
		}
		catch (error) {
			yield put(searchFailure({...props, error}));
		}
	}

	return debounce(ACTION.REQUEST, searchProducts);
}