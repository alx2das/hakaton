import {createSelector} from 'reselect'

export const getMoneySection = (state) => {
	return state.get('money');
};

export const getFilter = createSelector([getMoneySection], state => {
	return state.get('filter')
});

// export const getFilter = createSelector([getMoneySection], state =>
// 	state.get('filter')
// );

export const isFilteredList = createSelector([getFilter], filter =>
	filter.get('dateFrom') !== null || filter.get('dateFrom') !== null || filter.get('docType') !== null
);

export const getListPropsState = createSelector([getMoneySection], state => ({
	sortField: state.get('sortField'),
	sortDirection: state.get('sortDirection'),
	countStep: state.get('countStep'),
	pos: state.get('pos'),
	filter: state.get('filter').toJS(),
	noItems: state.get('noItems')
}));