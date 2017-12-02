import {createSelector} from 'reselect'

export const getChequesSection = (state) => {
	return state.get('cheques');
};

export const getFilter = createSelector([getChequesSection], state => {
	return state.get('filter')
});

export const isFilteredList = createSelector([getFilter], filter => {
	return filter.get('dateFrom') != null ||
		filter.get('dateFrom') != null ||
		filter.get('docType') != null;
});

export const getListPropsState = createSelector([getChequesSection], state => ({
	sortField: state.get('sortField'),
	sortDirection: state.get('sortDirection'),
	countStep: state.get('countStep'),
	pos: state.get('pos'),
	q: state.get('q'),
	filter: state.get('filter').toJS(),
	noItems: state.get('noItems')
}));

export const getViewState = createSelector([getChequesSection], state => state.get('chequeViews'));