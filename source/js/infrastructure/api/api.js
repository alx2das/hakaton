import {createApi} from 'core/http/api'
import {Http} from 'core/http/Http'
import {Interceptors} from 'core/http/Interceptors'
import tokenInterceptorCreator from '../interceptors/tokenInterceptor'

import base from './base'


function initApi() {
	const _interceptors = new Interceptors();
	const tokenInterceptor = tokenInterceptorCreator.create();

	_interceptors.push(tokenInterceptor);

	const _http = new Http(_interceptors);
	const api = createApi(_http);

	base(api);

	return api;
}

const api = initApi();

export default api;