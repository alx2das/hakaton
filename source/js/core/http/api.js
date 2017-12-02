/* global XMLHttpRequest, ActiveXObject */

//import Q from 'q'
//import config from 'config'
//import {Http} from './http'

function createApi(http) {
	//let beacon = sendBeacon;
	// if (__CLIENT__ && 'sendBeacon' in navigator) {
	//     beacon = navigator.sendBeacon;
	// }


	let httpMixin = {
		http(method, url, params, options) {
			return http.http(normalizeHttpOptions(method, url, params, options));
		},
		// beacon(url, params) {
		//     var blob = new Blob([JSON.stringify(params)], {
		//         type: 'application/json; charset=UTF-8'
		//     });
		//     return Q(beacon(url, blob)).then(
		//         function (result) {
		//             return Q.resolve(result);
		//         },
		//         function (error) {
		//             return Q.reject(error);
		//         }
		//     );
		// }
	};

	httpMixin = ['get', 'post', 'put', 'patch', 'delete', 'options'].reduce(bindHttpShortCut, httpMixin);

	const api = createResourse(getResourceProto());
	api.generatePath = function () {
		return __API_URL__;
	};

	return api;

	function getResourceProto() {
		return {
			http: httpMixin,

			getResource(resourseName){
				return function resourseFactory(id) {
					return this[normalizeResourceName(resourseName)](id);
				}.bind(this);
			},

			addResource: addResource
		};
	}

	function addResource(name, alias) {
		var parentResource = this;
		var methodName = normalizeResourceName(name);

		parentResource['$$prto'][methodName] = resource;

		var resourceProto = getResourceProto();

		return resource();

		function resource(id) {
			var parentResource = this;
			var res = createResourse(resourceProto);
			res.generatePath = createGeneratePathFunc(parentResource, res, id);
			createRestApiFor(res);
			return res;
		}

		function createGeneratePathFunc(parentResource, curentResource, id) {
			return function generatePath(endPoint) {
				var path = [];

				if (parentResource.generatePath) {
					path.push(parentResource.generatePath());
				}

				path.push(alias || name);

				if (id) {
					if (Array.isArray(id))
						id.forEach(s => path.push(s));
					else
						path.push(id);
				}

				if (endPoint) {
					path.push(endPoint);
				}

				return path.join('/');
			}.bind(curentResource);
		}

		/**
		 * Добавляет к объекту resource методы 'get', 'post', 'put', 'patch'
		 * @param resource - расширяемый объект
		 */
		function createRestApiFor(resource) {
			//  создаем в resource методы .get, .post и т.п.
			['get', 'post', 'put', 'patch', 'delete', 'options', 'beacon'].reduce(bindApiRestResourceShortCut, resource);

			function bindApiRestResourceShortCut(api, method) {
				api[method] = apiRestResourceShortCut;
				return api;

				function apiRestResourceShortCut(params, options) {
					return resource.http[method](resource.generatePath(), params, options);
				}
			}
		}
	}

	// function sendBeacon(url, params) {
	//     httpMixin.http('POST', url, params, {});
	//     return true;
	// }
}

function createResourse(resourseProto) {
	var resourse = Object.create(resourseProto);
	resourse['$$prto'] = resourseProto;
	resourse.addResource = resourse.addResource.bind(resourse);
	return resourse;
}

function normalizeResourceName(name) {
	return name.replace(/-([a-zA-Z])/ig, (str, p1) => p1.toUpperCase());
}

function normalizeHttpOptions(method, url, params, options) {
	return {url: url, data: params, method: method, ...options};
}

function bindHttpShortCut(httpMixin, method) {
	httpMixin[method] = httpShortCut;
	return httpMixin;

	function httpShortCut(url, params, options) {
		return httpMixin.http(method, url, params || null, options || null);
	}
}

export {createApi};

