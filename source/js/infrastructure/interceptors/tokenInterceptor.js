const AuthorizationKeyBasic = 'Authorization';

export default {
    create() {
        return {request, response, responseError};

        function request(config) {
            if (config.Authorization) {
                config.headers[AuthorizationKeyBasic] = config.Authorization;
            }

            // config.headers['X-Requested-With'] = 'XMLHttpRequest';
            // config.headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
            // config.headers['Access-Control-Allow-Credentials'] = true;
            // config.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,OPTIONS,POST,PUT';
            // config.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers';

            return config;
        }

        function response(resp) {
            return resp;
        }

        function responseError(resp) {
            return Promise.reject(resp);
        }
    }
}