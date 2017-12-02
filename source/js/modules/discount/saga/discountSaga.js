import {call, put, takeEvery, select, throttle, all} from 'redux-saga/effects'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import {notify} from 'common/uiElements/Notify'

import * as actEnums from '../actions/discountActions'
import {getListPropsState} from '../selectors/discountSelectors'
import * as dataContext from '../dataProvider/discountDataContext'
import {isServerError} from 'infrastructure/helpers/errorHelper'

function* getListDiscountSaga({isFirst = false, step = false}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		const propState = yield select(getListPropsState);

		const response = yield call(dataContext.getListDiscount, {
			token,
			sortField: propState.sortField,
			sortDirection: propState.sortDirection,
			count: propState.countStep,
			q: propState.q ? `name=="*${propState.q}*"` : '',
			pos: step ? propState.pos + propState.countStep : 0
		});
		yield put(actEnums.getListDiscount.success({
			list: response.data,
			pos: response.pos,
			total_count: response.total_count,
			noItems: isFirst ? !(response.data.length) : propState.noItems
		}))
	} catch (error) {
		yield put(notify.error('При загрузке скидок произошла ошибка', 'Ошибка'));
		yield put(actEnums.getListDiscount.failure(error));
	}
}

function* editDiscountSaga({code, ...discount}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		yield call(dataContext.editDiscount, {
			token,
			code,
			isNew: code === 'newItem',
			name: discount.name,
			value: discount.value
		});
		yield put(actEnums.getListDiscount.request({isFirst: true}));
		yield put(actEnums.editDiscount.success({code}));

		yield put(notify.success(code === 'newItem' ? 'Данные сохранены' : 'Данные обновлены'));
	} catch (error) {
		yield put(notify.error('При сохранении скидки произошла ошибка', 'Ошибка'));
		yield put(actEnums.editDiscount.failure(code));
	}
}

function* deleteDiscountSaga({code}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		yield call(dataContext.deleteDiscount, {
			token,
			code
		});
		yield put(actEnums.getListDiscount.request({isFirst: true}));
		yield put(actEnums.editDiscount.success({code}));

		yield put(notify.info('Скидка успешно удалена'));
	} catch (error) {
		yield put(notify.error('При удалении скидки произошла ошибка', 'Ошибка'));
		yield put(actEnums.editDiscount.failure(code));
	}
}

function* getByCodeDiscountSaga({code}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		const {data} = yield call(dataContext.getListDiscount, {
			token,
			q: `code=="${code}"`
		});

		if (data.length && data[0]) {
			yield put(actEnums.openDiscount(data[0]))
		} else throw new Error();
	} catch (error) {
		yield put(notify.error('При загрузке скидки произошла ошибка', 'Ошибка'));
		if (!isServerError(error))
			throw error;
	}
}


export default function* () {
	yield all([
		throttle(300, actEnums.GET_LIST.REQUEST, getListDiscountSaga),
		takeEvery(actEnums.EDIT_DISCOUNT.REQUEST, editDiscountSaga),
		takeEvery(actEnums.DELETE_DISCOUNT, deleteDiscountSaga),
		takeEvery(actEnums.LOAD_DETAIL, getByCodeDiscountSaga)
	])
}