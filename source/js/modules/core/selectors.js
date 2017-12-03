import {createSelector} from 'reselect'


export const getCurrentLocation = (state) => {
	return state.getIn(['router', 'location']);
};