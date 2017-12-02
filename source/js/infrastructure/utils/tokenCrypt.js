export const encrypt = (email, pass) => {
	return btoa(`${email}:${pass}`);
};

export const decrypt = (token) => {
	const values = atob(token).split(':');
	let email = null, password = null;
	if (values.length == 2) {
		email = values[0];
		password = values[1];
	}
	return {email, password};
};