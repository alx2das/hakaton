import * as mapper from './accountMapper'
import api from 'infrastructure/api/api'

/**
 * Авторизация
 * @returns {*|axios.Promise}
 */
export function profile(token) {
	return api.v1().profile().get({}, {Authorization: token && `Basic ${token}`, headers: { 'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private' }})
		.then((response) => mapper.toClientLogin(response));
}

export function logout() {
	return api.v1().logout().get();
}

export const forgotPass = (email, captcha) => {
	return api.v1().user(email).tempPassword().post({captcha});
};

/**
 * Смена пароля
 * @param email
 * @returns {axios.Promise|*}
 */
export const changePass = (oldPassword, newPassword) => {
	const queryString = `currentPassword=${oldPassword}&newPassword=${newPassword}`;
	return api.v1().user().password().put({
		currentPassword: oldPassword,
		newPassword: newPassword
	}, {querystring: queryString})
		.then((response) => response);
};

/**
 * Регистрация
 */
export const register = (user) => {
	return api.v1().webUser().post({
		captcha: user.captcha,
		email: user.email,
		password: user.password,
		phone: user.phone,
		userCompanyName: user.company,
		userName: `${user.name} ${user.surname}`
	});
};

/**
 * Получает состояние о подключение сервиса "МойСклад"
 */
export const getStateIntegration = () => {
	return api.v1().user().moysklad().state().get()
		.then((response) => {
			return {
				msIntegrationEnabled: response.data.msIntegrationEnabled,
				msLogin: response.data.msLogin,
				msPassword: ''
			}
		});
};

/**
 * Запрос на проверку наличия пользователя в МойСклад или сохраняет данные на сервере
 * @param testing		- выполняется тестовый запрос или сохранение данных на сервере
 * @param msLogin		- логин в формате "admin@***"
 * @param msPassword	- пароль
 */
export const connectIntegration = (testing, msLogin, msPassword) => {
	const queryString = `checkOnly=${testing}&msLogin=${msLogin}&msPassword=${msPassword}`;
	return api.v1().user().moysklad().enable().put({
		checkOnly: testing,
		msLogin: msLogin,
		msPassword: msPassword
	}, {querystring: queryString});
};

/**
 * Удаляет данные о интеграции
 * @returns {*}
 * /api/v1/user/moysklad/disable
 */
export const disabledIntegration = () => {
	return api.v1().user().moysklad().disable().put();
};