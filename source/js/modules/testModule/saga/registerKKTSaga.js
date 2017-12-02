import {call, put, takeEvery, all} from 'redux-saga/effects'
import {notify} from 'common/uiElements/Notify'

import * as actEnums from '../actions/registerKKTActions'
import * as dataContext from '../dataProvider/regKKTDataContext'


function* updateStatusSaga(props) {
	try {
		const res = yield call(dataContext.updateStatus, props);
		yield put(actEnums.updateStatus.success(res));
		yield put(notify.success('Новый статус успешно установлен'));
	} catch (error) {
		yield put(notify.error(error.data.message, `${error.status} ${error.data.error}`))
	}
}


export default function* () {
	yield all([
		takeEvery(actEnums.UPDATE_STATUS.REQUEST, updateStatusSaga)
	])
}