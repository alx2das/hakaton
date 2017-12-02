import {createSelector} from 'reselect'
import {getFormValues} from 'redux-form/immutable'
export const getSection = (state) => {
	return state.get('iShopDocs');
};

export const getDocuments = createSelector([getSection], (section) => {
	return section ? section.get('documents') : null;
});

export const getLoader = createSelector([getSection], (section) => {
	return section ? section.get('loading') : false;
});

export const getNoItems = createSelector([getSection], (section) => {
	return section ? section.get('noItems') : false;
});

export const getFilter = createSelector([getSection], (section) => {
	return section.get('docsFilter');
});

export const getTotalCount = createSelector([getFilter], (filter) => {
	return filter.get('totalCount');
});

export const getDocumentView = (id) => createSelector([getSection], (docs) => {
	return docs.getIn(['docViews', id]);
});
