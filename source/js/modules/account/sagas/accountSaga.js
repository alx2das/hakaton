import {call, put, takeEvery, select, all} from 'redux-saga/effects'
import * as actions from '../enums/actions';
import * as registerDataContext from '../dataProvider/accountDataContext';
import {register, forgot, changePassword} from '../actions/accountActions';
import {notify} from 'common/uiElements'
import {encrypt, decrypt} from 'infrastructure/utils/tokenCrypt'
import localStorage from 'core/storage/localStorage'
import {isServerError} from 'infrastructure/helpers/errorHelper'


const getError = (error) => {
	if (!error) {
		return '';
	}
	if (error.status == 401 ||
		(error.data && error.data.message == "Current password didn't match")) {
		return 'Неверный текущий пароль!';
	}
	return 'Произошла неизвестная ошибка.'
};

function* forgotPassword({email, captcha}) {
	try {
		yield call(registerDataContext.forgotPass, email, captcha);
		yield put(forgot.success());
	} catch (error) {
		yield put(forgot.failure({
			status: error.status,
			data: error.data
		}));
		if (!isServerError(error))
			throw error;
	}
}

function* changePass({oldPassword, newPassword}) {
	try {
		const response = yield call(registerDataContext.changePass, oldPassword, newPassword);
		yield put(changePassword.success());
		yield put(notify.success('Пароль успешно изменен'));
	} catch (error) {
		const message = getError(error);
		if (message) {
			yield put(notify.error(message));
		}
		yield put(changePassword.failure({
			status: error.status,
			data: error.data
		}));
		if (!isServerError(error))
			throw error;
	}
}

/*function* setNewToken(password) { // не нужен с x-token
	const oldToken = yield select(getToken);
	const {email} = decrypt(oldToken);
	const newToken = encrypt(email, password);
	yield call(localStorage.setItem, 'X-TOKEN', newToken);
}*/

function* registerUser({user}) {
	try {
		yield call(registerDataContext.register, user);
		yield put(register.success());
	} catch (error) {
		yield put(register.failure({
			status: error.status,
			data: error.data
		}));
		if (!isServerError(error))
			throw error;
	}
}

export default function*() {
	yield all([
		takeEvery(actions.REGISTER.REQUEST, registerUser),
		takeEvery(actions.FORGOT.REQUEST, forgotPassword),
		takeEvery(actions.CHANGE_PASSWORD.REQUEST, changePass)
	]);
}