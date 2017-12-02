import {createSelector} from 'reselect'

const getRetailPointsData = (state) => {
	return state.get('retailPointsData');
};

export const getPointId = createSelector([getRetailPointsData], rpData => {
	return rpData.get('selectedPointId');
});

export const getCurrentLocation = (state) => {
	return state.getIn(['router', 'location']);
};