//import q from 'q';
import cookie from 'core/storage/cookies';
import { ANON_PAGES } from 'modules/account/enums/anonPages';

const AuthorizationKeyBasic = 'Authorization';
//const xRegistrationTokenKey = 'X-RegistrationToken';

export default {
	create(){

		return {request, response, responseError};

		function request(config) {
			if (config.Authorization) {
				config.headers[AuthorizationKeyBasic] = config.Authorization;
			}

			//это нужно чтобы при получении 401, в барузере не появлялся стандартный попап для авторизации
			config.headers['X-Requested-With'] = 'XMLHttpRequest';

			/*const token = getToken();
			if (token) {
				config.headers[tokenKey] = token;
			}*/

			return config;
		}

		function response(resp) {
			// let token = resp.headers[xTokenKey] || resp.headers[xRegistrationTokenKey];
			// if (token) {
			// 	setToken(token);
			// }
			return resp;
		}

		function responseError(resp) {
			if (resp.status == 401 && !resp.config.Authorization) { // если пришла 401 ошибка, не вовремя BasicAuth(вход в систему), обнуляем токен и отправляем на авторизацию
				//cookie.set('SESSION', null);
				if(window.location.href && ANON_PAGES.filter((page) => window.location.href.indexOf(page) != -1).length == 0)
					window.location.href = '/signin?redirectUrl=' + (window.location.pathname || ''); // перенаправляем на страницу авторизации с текущей страницей
			}
			return Promise.reject(resp);
		}
	}
}