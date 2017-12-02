import {createSelector} from 'reselect'
import {getPointId} from 'modules/core/selectors'

const getRetailPointsData = (state) => {
	return state.get('retailPointsData');
};

export const getRetailPointList = createSelector([getRetailPointsData], rpData => {
	return rpData.get('retailPoints');
});

export const getCurrentRetailPointId = getPointId;

export const getRetailPointInLayer = createSelector([getRetailPointsData], rpData => {
	return rpData.getIn(['retailPointInLayer'], null);
});

export const getRetailPointListLoading = createSelector([getRetailPointsData], rpData => {
	return rpData.get('loading');
});

export const getRetailPointErrorPopup = createSelector([getRetailPointsData], rpData => {
	return rpData.get('errorPopup');
});

