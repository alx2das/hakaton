export const isServerError = error => {
	if (!error)
		return false;
	const status = error.status || (error.data || {}).status;
	return status >= 400;
};

export const mapServerError = error => {
	if (!error)
		return {message: 'unknown', invalidContract: false};

	if (typeof error === 'string')
		return {message: error, invalidContract: false};

	let serverError = error;

	if (error.data) {
		serverError = typeof error.data === 'string' ? {message: error.data} : error.data;
	}
	serverError.invalidContract = serverError.status >= 400 && serverError.status <= 499;
	return serverError;
};

export const isNetworkError = error => {
	return error && error.message && error.message.toLowerCase() == 'network error';
};