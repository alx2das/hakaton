import {Map, List, fromJS} from 'immutable'
import * as actEnums from '../actions/discountActions'


export const initialState = Map({
	loading: true,
	errors: null,
	success: null,

	noItems: null,			// изначально неизвестно есть ли элементы
	countStep: 20,			// кол-во элементов зв звпрос (постраничная загрузка)

	// список
	list: List([]),
	pos: 0,					// сдвиг элементов на странице
	total_count: 0,			// всего элементов в БД

	// сортировка
	sortField: 'name',		// поле сортировки
	sortDirection: 'asc',	// направление сорт.

	q: ''					// параметры фильтра
});

export const actionHandlers = {
	[actEnums.GET_LIST.REQUEST]: (state, req) => {
		let props = {};

		if (req.isFirst) {
			props.sortField = initialState.get('sortField');
			props.sortDirection = initialState.get('sortDirection');
			props.q = initialState.get('q');
		} else {
			props.sortField = req.sortField || state.get('sortField');
			props.sortDirection = req.sortDirection || state.get('sortDirection');
			props.q = req.q !== undefined ? req.q : state.get('q');
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
	}
};