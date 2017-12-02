import {Map, List, fromJS} from 'immutable';
import * as actions from '../actions/shopDocsActions';

export const initialState = Map({
	loading: false,
	documents: List([]),
	error: null,
	docsFilter: Map({
		start: 0,
		totalCount: null,
		count: null,
		filter: Map({
			docType: null,
			selectedStates: null,
			dateFrom: null,
			dateTo: null
		})
	}),
	docViews: Map({})
});

export const actionHandlers = {
	[actions.GET_DOCUMENTS.REQUEST]: (state, action) => {
		return state.merge({loading: true});
	},
	[actions.SEARCH_DOCUMENTS]: (state, action) => {
		return state.merge({loading: true});
	},
	[actions.GET_DOCUMENTS.SUCCESS]: (state, {totalCount, pos, documents}) => {
		const filter = state.getIn(['docsFilter', 'filter']);
		return state.merge({
			loading: false,
			documents: pos > 0 ? state.get('documents').concat(fromJS(documents)) : fromJS(documents)
		}).setIn(['docsFilter', 'totalCount'], totalCount);
	},
	[actions.GET_DOCUMENTS.FAILURE]: (state, {error}) => {
		return state.merge({loading: false, error: fromJS(error)});
	},

	[actions.SET_FILTER]: (state, {filter}) => {
		const oldFilter = state.getIn(['docsFilter']).toJS();
		if (filter.restart) {
			oldFilter.start = 0;
			oldFilter.totalCount = null;
		}

		if (filter.count !== undefined)
			oldFilter.count = filter.count;

		if (filter.sortField !== undefined) {
			oldFilter.sortField = filter.sortField;
		}

		if (filter.sortDirection !== undefined) {
			oldFilter.sortDirection = filter.sortDirection;
		}

		if (filter.filter) {
			Object.keys(filter.filter).forEach(key => {
				oldFilter.filter[key] = filter.filter[key];
			});
		}
		return state.mergeIn(['docsFilter'], fromJS(oldFilter));
	},
	[actions.CORRECT_FILTER]: (state, {pos}) => {
		const count = state.getIn(['docsFilter', 'count'], 0);
		return state.setIn(['docsFilter', 'start'], pos + count);
	},
	[actions.GET_DOCUMENT_DETAILS.REQUEST]: (state, {id}) => {
		if (!state.getIn(['docViews', id])) {
			return state.setIn(['docViews', id], fromJS({loading: true}));
		}
		else {
			return state.mergeIn(['docViews', id], fromJS({loading: true}));
		}
	},
	[actions.GET_DOCUMENT_DETAILS.SUCCESS]: (state, {document}) => {
		return state.mergeIn(['docViews', document.id], fromJS({loading: false, document}));
	},
	[actions.GET_DOCUMENT_DETAILS.FAILURE]: (state, {id, error}) => {
		return state.mergeIn(['docViews', id], fromJS({loading: false, error}));
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
