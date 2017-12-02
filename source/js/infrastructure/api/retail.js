export default (api) => {
	/**
	 * авторизация
	 */
	api.v1().addResource('retailpoints', 'retail-points');
	api.v1().addResource('retailpoint', 'retail-point');
	api.fn().v1().addResource('retailpoint', 'retail-point');

	/**
	 * Регистрация ККТ в ОФД
	 */

	api.v1().retailpoint().addResource('registration', 'registration-request');
	api.v1().retailpoint().registration().addResource('check');
	api.v1().retailpoint().addResource('cloudsign', 'cloud-sign');
	api.v1().retailpoint().cloudsign().addResource('session');
	api.v1().retailpoint().cloudsign().addResource('sessionpassword', 'session-password');
	api.v1().retailpoint().registration().addResource('process', 'process');
	api.v1().retailpoint().registration().addResource('reportprint', 'request-report-print');
};
