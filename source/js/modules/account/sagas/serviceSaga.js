import {call, put, takeEvery, all} from 'redux-saga/effects'
import {isServerError}  from 'infrastructure/helpers/errorHelper'
import {notify} from 'common/uiElements/Notify'
import * as actEnums from '../actions/serviceActions'
import * as dataContext from '../dataProvider/accountDataContext'


function* getSateIntegrationSaga() {
	try {
		const response = yield call(dataContext.getStateIntegration);
		yield put(actEnums.getState.success(response));
	} catch (error) {
		yield put(actEnums.getState.failure(error));
		if (!isServerError(error))
			throw error;
	}
}

function* checkSaveIntegrationSaga({msLogin, msPassword, save}) {
	try {
		yield call(dataContext.connectIntegration, save, msLogin, msPassword);
		yield put(actEnums.checkSaveIntegration.success(save));

		if (!save) {
			yield put(notify.success('Интеграция с МойСклад подключена'));
		}
	} catch (error) {
		yield put(actEnums.checkSaveIntegration.failure(error));
		if (!isServerError(error))
			throw error;
	}
}

function* disableIntegrationSaga() {
	try {
		yield call(dataContext.disabledIntegration);
		yield put(actEnums.disableIntegration.success());
		yield put(notify.info('Интеграция с МойСклад отключена'));
	} catch (err) {
		yield put(actEnums.disableIntegration.failure(error));
		if (!isServerError(error))
			throw error;
	}
}


export default function* () {
	yield all([
		takeEvery(actEnums.GET_STATE.REQUEST, getSateIntegrationSaga),
		takeEvery(actEnums.CHECK_SAVE_INTEGRATION.REQUEST, checkSaveIntegrationSaga),
		takeEvery(actEnums.DISABLE_INTEGRATION.REQUEST, disableIntegrationSaga),
	]);
}