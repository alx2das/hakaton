import {call, put, select, throttle, all} from 'redux-saga/effects'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import {notify} from 'common/uiElements/Notify'
import logger from 'infrastructure/utils/logger'
import dateHelper from 'common/helpers/dateHelper'

import * as actEnums from '../actions/moneyActions'
import * as dataContext from '../dataProvider/dataContext'
import {getListPropsState} from '../selectors/moneySelectors'


function* getListMoneySaga({isFirst = false, step = false}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		const propState = yield select(getListPropsState);
		const query = yield call(getValidQueryParams, propState.filter);

		const response = yield call(dataContext.getMoneyDocs,
			token,
			(step ? propState.pos + propState.countStep : 0),
			propState.countStep,
			query,
			propState.sortField,
			propState.sortDirection
		);
		yield put(actEnums.getListMoney.success({
			list: response.orders,
			pos: response.pos,
			total_count: response.totalCount,
			noItems: isFirst ? !(response.orders.length) : propState.noItems
		}));
	} catch (error) {
		logger.log(error);
		yield put(notify.error('При загрузке данных произошла ошибка', 'Ошибка'));
		yield put(actEnums.getListMoney.failure());
	}
}

export function* getValidQueryParams({dateFrom, dateTo, docType, q}) {
	let query = [];

	if (q && q.length) {
		query.push(`docNum==${q}`);
	}
	if (dateFrom instanceof Date) {
		query.push(`dateCreated=ge="${dateHelper.dateFormat(dateHelper.setStartDate(dateFrom), 'serverDateTime')}"`);
	}
	if (dateTo instanceof Date) {
		query.push(`dateCreated=le="${dateHelper.dateFormat(dateHelper.setEndDate(dateTo), 'serverDateTime')}"`);
	}
	if (docType) {
		query.push(`type=="${docType}"`)
	}

	return query.join(';');
}


export default function* () {
	yield all([
		throttle(300, actEnums.GET_LIST.REQUEST, getListMoneySaga)
	])
}