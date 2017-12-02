import {createSelector} from 'reselect'

export const getSection = (state) => {
	return state.get('cashBoxTabs');
};

export const getTabs = createSelector([getSection], data => {
	return data.get('tabList').toList().sortBy(s => s.get('order'));
});

export const getActiveKeys = createSelector([getSection], data => {
	return data.get('keysActive').toList();
});

export const getActiveTab = createSelector([getSection], data => {
	return data.get('tabActive');
});

export const getSelectedKey = createSelector([getSection], data => {
	return data.get('selectedKey');
});

export const getProducts = createSelector([getSection], data => {
	return data.get('searchProductsResult');
});

export const getCategories = createSelector([getSection], data => {
	return data.get('searchGroupsResult');
});
