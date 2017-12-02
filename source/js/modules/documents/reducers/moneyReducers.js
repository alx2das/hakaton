import {Map, List, fromJS} from 'immutable';
import * as actEnums from '../actions/moneyActions';


export const initialState = Map({
	loading: true,
	success: null,
	error: null,
	filter: Map({
		dateFrom: null,
		dateTo: null,
		docType: null,
		q: ''
	}),
	noItems: null,
	countStep: 20,
	list: List([]),
	pos: 0,
	total_count: 0,
	sortField: 'dateCreated',
	sortDirection: 'desc'
});

export const actionHandlers = {
	// запрос списка элементов
	[actEnums.GET_LIST.REQUEST]: (state, req) => {
		let props = {};

		if (req.isFirst) {
			props.sortField = initialState.get('sortField');
			props.sortDirection = initialState.get('sortDirection');
			props.filter = Map({
				dateFrom: null,
				dateTo: null,
				docType: null,
				q: ''
			});
		} else {
			props.sortField = req.sortField || state.get('sortField');
			props.sortDirection = req.sortDirection || state.get('sortDirection');
		}

		return state.merge({
			loading: true,
			errors: null,
			success: null,
			...props
		});
	},
	[actEnums.GET_LIST.SUCCESS]: (state, res) => {
		const arList = res.pos ? state.get('list').concat(fromJS(res.list)) : List(res.list);
		return state.merge({
			loading: false,
			errors: null,
			success: true,

			list: arList,
			noItems: res.noItems,
			pos: res.pos,
			total_count: res.total_count
		});
	},
	[actEnums.GET_LIST.FAILURE]: (state) => {
		return state.merge({
			loading: false,
			errors: true,
			success: null
		});
	},

	// установка параметров фильтра
	[actEnums.SET_FILTER_PARAMS]: (state, props) => {
		return state.mergeIn(['filter'], fromJS(props));
	}
};


export default (createReducer) => createReducer(initialState, actionHandlers);
