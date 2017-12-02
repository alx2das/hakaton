import {createSelector} from 'reselect'

export const getListState = (state) => {
	return state.get('listDiscount');
};

export const getListPropsState = createSelector([getListState], state => ({
	sortField:		state.get('sortField'),
	sortDirection:	state.get('sortDirection'),
	countStep:		state.get('countStep'),
	q:				state.get('q'),
	pos:			state.get('pos'),
	noItems:		state.get('noItems')
}));

export const getEditState = (state) => {
	return state.get('editDiscount');
};