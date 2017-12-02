import axios from 'axios'

class Http {
	constructor(interceptors) {
		this.interceptors = interceptors;
	}

	http(params) {
		return this.interceptors.apply(Promise.resolve(normalizeHttpOptions(params)), serverRequest);
	}
}

function serverRequest(params) {
	// return Q.Promise(function (resolve, reject, notify) {
	// 	axios(params)
	// 		.then(resolve, reject, notify);
	// });
	return new Promise(function (resolve, reject) {
		axios(params).then(resolve, reject);
	})
}

function normalizeHttpOptions(params) {
	params.headers = params.headers || {};
	if (params.method.toUpperCase() === 'GET' && params.data) {
		params.params = params.data;
		delete params.data;
	}
	if (params.querystring) {
		params.url += '?' + params.querystring;
	}
	return params;
}

export {Http}
