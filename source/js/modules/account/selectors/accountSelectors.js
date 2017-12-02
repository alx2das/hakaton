import {createSelector} from 'reselect'

export const getSection = (state) => {
	return state.get('auth');
};

export const getRegistrationSection = (state) => {
	return state.get('reg');
};

export const getForgotSection = (state) => {
	return state.get('forgot');
};

export const getChangePasswordSection = (state) => {
	return state.get('changePassword');
};

export const getAuthData = createSelector([getSection], (section) => {
	return section ? section.get('authData') : null;
});

export const getLogoutState = createSelector([getSection], (section) => {
	return section ? section.get('logout') : null;
});

export const getAppReady = createSelector([getSection], (app) => {
	return app ? app.get('appReady') : false;
});

export const getUser = createSelector([getAuthData], (info) => {
	return info ? info.get('user') : null;
});

export const getCompany = createSelector([getAuthData], (info) => {
	return info ? info.get('company') : null;
});

export const getCurrentLocation = (state) => {
	return state.getIn(['router', 'location']);
};

export const getServiceSection = (state) => {
	return state.get('service');
};