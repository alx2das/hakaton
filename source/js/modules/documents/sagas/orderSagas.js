import {call, put, select, take, fork, takeEvery, takeLatest, all} from 'redux-saga/effects'
import subscribeToUrl from 'modules/core/sagas/subscribeToUrl'
import * as actions from '../actions/orderActions'
import * as selectors from '../selectors/orderSelectors'
import {getPointId} from 'modules/core/selectors'
import {notify} from 'common/uiElements/Notify';
import * as dataContext from '../dataProvider/dataContext'
import logger from 'infrastructure/utils/logger'
import createSearchProductsSaga from 'modules/core/sagas/createSearchProductsSaga';
import {SHIFT_TYPE} from '../enums'
import {uuid} from 'infrastructure/utils/uuidGenerator'
import {debounce} from 'redux-saga-debounce-effect'
import {isServerError, mapServerError} from 'infrastructure/helpers/errorHelper'

function* init() {
	yield takeLatest(actions.CREATE_ORDER.REQUEST, createOrder);
	yield takeLatest(actions.GET_ORDERS.REQUEST, getOrders);
	yield takeLatest(actions.GET_ORDER_NEW_NUMBER.REQUEST, getOrderNewNumber);
	yield takeEvery(actions.GET_ORDER_DETAILS.REQUEST, getOrderDetails);
	yield takeEvery(actions.DELETE_ORDER, deleteOrderSaga);
	yield fork(debounceSearchOrders);
}

function* deleteOrderSaga({id}) {
	try {
		const retailPointId = yield select(getPointId);

		yield call(dataContext.deleteOrder, {
			retailPointId,
			external: SHIFT_TYPE.EXTERNAL,
			cashdocId: id
		});
		yield put(actions.getOrders.request());
	} catch (error) {
		yield put(actions.getOrders.failure({error}));
		if (!isServerError(error))
			throw error;
	}
}

function* debounceSearchOrders() {
	yield debounce(actions.SEARCH_ORDERS, getOrders);
}

function* createOrder({order, products}) {
	if (!products || products.length == 0) {
		yield put(notify.error('Добавьте товары'));
		yield put(actions.createOrder.failure({error: {message: 'Добавьте товары'}}));
	} else {
		try {
			const document = {};
			const actualSum = yield select(selectors.getFormTotalSum);
			const retailPointId = yield select(getPointId);

			document.id = uuid();
			document.actualSum = actualSum;
			document.baseSum = actualSum;
			document.beginDateTime = order.beginDateTime;
			document.docType = order.docType;
			document.status = order.status;
			document.docNum = order.docNum;
			document.description = order.description;
			document.inventPositions = products;

			yield call(dataContext.saveOrder, retailPointId, SHIFT_TYPE.EXTERNAL, document);
			yield put(actions.createOrder.success({order: document}));
		} catch (error) {
			if (!isServerError(error))
				throw error;
			else {
				const serverError = mapServerError(error);
				if (serverError.error === 'Conflict') {
					serverError.docNum = order.docNum;
					yield put(notify.error('Заказ с таким номером уже существует'));
				}
				else if (serverError.invalidContract)
					yield put(notify.error('На форме имеются ошибки'));
				else
					yield put(notify.error('Не удалось сохранить заказ'));
				yield put(actions.createOrder.failure({error: serverError}));
			}
		}
	}
}

function* getOrders() {
	try {
		let filterModel = yield select(selectors.getOrdersFilter);
		const {filter, start, count, sortField, sortDirection, totalCount:total}=filterModel.toJS();

		const retailPointId = yield select(getPointId);
		let q = [];
		if (filter) {
			q.push(`:quickSearch="${filter}"`)
		}

		q.push(`shift.id=="${SHIFT_TYPE.EXTERNAL}"`);
		q = q.join(';');

		const {pos, totalCount, orders} = yield call(dataContext.getOrders, retailPointId, start, count, q, sortField, sortDirection);
		yield put(actions.getOrders.success({pos, totalCount, orders}));
		yield put(actions.correctFilter({pos}));
	}
	catch (error) {
		logger.log(error);
		yield put(actions.getOrders.failure({error}));
	}
}

function* getOrderNewNumber() {
	try {
		const retailPointId = yield select(getPointId);
		const number = yield call(dataContext.getOrderNextNumber, retailPointId);
		yield put(actions.getOrderNewNumber.success({number}));
	}
	catch (error) {
		logger.log(error);
		//yield put(actions.getOrders.failure({error}));
	}
}

function* getOrderDetails({point, id}) {
	try {
		const order = yield call(dataContext.getOrder, point, SHIFT_TYPE.EXTERNAL, id);
		yield put(actions.getOrderDetails.success({order}));
	}
	catch (error) {
		logger.log(error);
		yield put(actions.getOrderDetails.failure({id, error}));
		if (!isServerError(error))
			throw error;
	}
}

const searchProduct = createSearchProductsSaga(actions.SEARCH_PRODUCTS);

export default function*() {
	yield all([
		//fork(subscribeToUrl, ['/documents/external', '/documents/external/add'], init),
		fork(init),
		searchProduct
	])
}