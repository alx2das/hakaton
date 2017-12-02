import {createSelector} from 'reselect'

export const getListSection = (state) => {
	return state.get('listContragent');
};

export const getListPropsState = createSelector([getListSection], state => {
	return {
		sortField:		state.get('sortField'),
		sortDirection:	state.get('sortDirection'),
		countStep:		state.get('countStep'),
		q:				state.get('q'),
		pos:			state.get('pos'),
		isCashier:		state.get('isCashier'),
		noItems:		state.get('noItems')
	}
});

export const getEditSection = (state) => {
	return state.get('editContragent');
};