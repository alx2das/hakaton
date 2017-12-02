import {call, put, take, fork, cancel, takeEvery, select, all} from 'redux-saga/effects'
import {LOGIN, LOGOUT} from '../enums/actions'
import {login, checkingAccessStart, checkingAccessStop, clearApp} from '../actions/loginActions'
import localStorage from 'core/storage/localStorage'
import {isServerError} from 'infrastructure/helpers/errorHelper'
import * as dataContext from '../dataProvider/accountDataContext'
import * as accountSelectors from '../selectors/accountSelectors'
import * as retailPointsSaga from '../../retailPoints/sagas/retailPointsSaga'
import {encrypt} from 'infrastructure/utils/tokenCrypt'
import cookie from 'core/storage/cookies';
import { ANON_PAGES } from '../enums/anonPages';

const signInLocation = {pathname: '/signin'};

function* authorize(email, pass, redirectUrl) {
	try {
		let token;
		try {	// TODO btoa - не поддерживает кириллические символы
			token = encrypt(email, pass);
		} catch (err) { throw {status: 401}; }
		const profile = yield call(dataContext.profile, token);
		yield put(login.success({profile, token}));
		window.location.href = redirectUrl;
	} catch (error) {
		yield put(login.failure({
			status: error.status,
			data: error.data
		}));
		if (!isServerError(error)) {
			throw error;
		}
	}
}


function* watchLogin() {
	while (true) {
		const {email, pass, redirectUrl} = yield take(LOGIN.REQUEST);
		const task = yield fork(authorize, email, pass, redirectUrl);
		if (task) {
			yield take([LOGOUT, LOGIN.FAILURE]);
			cancel(task);
		}
	}
}

function* watchLogout() {
	yield takeEvery(LOGOUT, logout);
}

function* logout() {
	window.Intercom && window.Intercom('shutdown');
	yield call(dataContext.logout);
	yield put(clearApp());
	window.location.href = signInLocation.pathname;
}

function* initApp() {
	const location = yield  select(accountSelectors.getCurrentLocation);
	try {
		const appReady = yield select(accountSelectors.getAppReady);
		if (appReady)
			return;
		yield put(checkingAccessStart());
		let authData = yield select(accountSelectors.getAuthData);
		if (authData == null) {
			//const session = cookie.get('SESSION');
			//if (session) {
			yield put(login.request());
			const profile = yield call(dataContext.profile); // вызовем без токена, получим внутри tokenInterceptor, иначе не знаем, Basic Auth или Xtoken
			// const profile = yield call(dataContext.profile, token);
			yield put(login.success({profile}));


			if (ANON_PAGES.filter((page) => location.get('pathname').indexOf(page) != -1).length != 0)
				window.location.href = '/';

			yield fork(retailPointsSaga.runRetailPoints);
			//}
		} else {
			yield fork(retailPointsSaga.runRetailPoints);
		}
		yield put(checkingAccessStop());

	} catch (err) {
		yield put(checkingAccessStop());
		// yield put(login.failure(err));
		if(ANON_PAGES.filter((page) => location.get('pathname').indexOf(page) != -1).length == 0)
			window.location.href = signInLocation.pathname;
		// yield call(localStorage.removeItem, tokenKey);
	}
}


export default function* () {
	try {
		yield all([
			fork(initApp),
			fork(watchLogin),
			fork(watchLogout)
		])
	}
	catch (ex) {
		alert(ex);
	}
}