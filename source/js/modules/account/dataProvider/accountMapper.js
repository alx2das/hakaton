export const toClientLogin = (response) => {
	const { data } = response;
	return {
		company: {name: data.userCompanyName},
    user: {
			name: data.userName,
			email: data.email,
		}
	};
};