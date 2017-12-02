import {createSelector} from 'reselect'

export const getSection = (state) => {
	return state.get('report');
};