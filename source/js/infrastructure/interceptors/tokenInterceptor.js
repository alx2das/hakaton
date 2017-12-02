const AuthorizationKeyBasic = 'Authorization';

export default {
    create() {
        return {request, response, responseError};

        function request(config) {
            if (config.Authorization) {
                config.headers[AuthorizationKeyBasic] = config.Authorization;
            }

            config.headers['X-Requested-With'] = 'XMLHttpRequest';
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