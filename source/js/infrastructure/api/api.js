import {createApi} from 'core/http/api';
import base from './base';
import user from './user';
import retail from './retail';
import catalog from './catalog';
import cashdocs from './cashdocs';
import docs from './docs';
import {Http} from 'core/http/Http';
import {Interceptors} from 'core/http/Interceptors';
import tokenInterceptorCreator from '../interceptors/tokenInterceptor';

function initApi() {
	const _interceptors = new Interceptors();
	const tokenInterceptor = tokenInterceptorCreator
		.create();
	_interceptors.push(tokenInterceptor);
	const _http = new Http(_interceptors);
	const api = createApi(_http);
	base(api);
	// user(api);
	// retail(api);
	// catalog(api);
	// cashdocs(api);
	// docs(api);
	return api;
}

const api = initApi();

export default api;