import {createSelector} from 'reselect'


export const getRegisterKKTState = (state) => {
	return state.get('registerKKT')
};

export const getInitPulling = createSelector([getRegisterKKTState], (state) => {
	return !!(state.get('initPulling'));
});

export const getLoadingInstallToken = createSelector([getRegisterKKTState], (state) => {
	return state.get('loadingToken');
});