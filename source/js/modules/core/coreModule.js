import {all, put, takeEvery} from 'redux-saga/effects'
import {GLOBAL_SAGA_ERROR} from './actions'
import {notify} from 'common/uiElements/Notify'
import {isNetworkError} from 'infrastructure/helpers/errorHelper'

function* handleErrors({error}) {
	if (isNetworkError(error)) {
		yield put(notify.errorWithOptions({
			message: 'Похоже, проблемы с интернет-соединением',
			position: 'bl',
			autoDismiss: 20,
			uid: 'error-network'
		}));
	}
	else {
		yield put(notify.errorWithOptions({
			message: 'Произошла ошибка, попробуйте выполнить действие позже',
			position: 'bl',
			autoDismiss: 20,
			uid: 'error-network'
		}));
	}
}

export function getSagas() {
	return all([
		takeEvery(GLOBAL_SAGA_ERROR, handleErrors)
	]);
}