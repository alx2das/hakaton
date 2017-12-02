import {Map, List, fromJS} from 'immutable';
import * as actEnums from '../actions/chequeActions'


export const initialState = Map({
	loading: true,
	errors: null,
	success: null,

	filter: Map({			// параметры фильтра
		dateFrom: null,		// дата От
		dateTo: null,		// дата До
		docType: null,
		q: ''
	}),

	noItems: null,			// изначально неизвестно есть ли элементы
	countStep: 20,			// кол-во элементов зв звпрос (постраничная загрузка)

	// список
	list: List([]),
	pos: 0,					// сдвиг элементов на странице
	total_count: 0,			// всего элементов в БД

	// сортировка
	sortField: 'beginDateTime',	// поле сортировки
	sortDirection: 'desc',		// направление сорт.

	chequeViews: Map({			// детальный просмотр чека
		'0f4-...-f6e': Map({
			loading: true,
			errors: null,
			success: null,
			// ...
		})
	})
});

export const actionHandlers = {
	// загрузка списка
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
			pos: res.pos,
			total_count: res.total_count,

			noItems: res.noItems
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
	},

	// подгрузка чека для детального просмотра
	[actEnums.GET_DETAIL.REQUEST]: (state, {chequeId}) => {
		return state.mergeIn(['chequeViews', chequeId], {
			loading: true
		});
	},
	[actEnums.GET_DETAIL.SUCCESS]: (state, {chequeId, response}) => {
		return state.mergeIn(['chequeViews', chequeId], {
			loading: false,
			...response
		});
	},
	[actEnums.GET_DETAIL.FAILURE]: (state, {chequeId}) => {
		return state.mergeIn(['chequeViews', chequeId], {
			loading: false
		});
	},
};


export default (createReducer) => createReducer(initialState, actionHandlers);