import {createSelector} from 'reselect'

export const getLayerSection = (state) => {
	return state.get('layers');
};

export const getLayer = (layerId) => createSelector([getLayerSection], data => {
	return data.getIn(['layers', layerId]);
});
