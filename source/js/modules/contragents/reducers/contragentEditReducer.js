import {Map, List, fromJS} from 'immutable'
import * as actEnums from '../actions/contragentActions'

export const initialState = Map({
	'newItem': Map({
		loading: false,
		errors: null,
		success: null,

		name: '',
		password: '',
		locked: 'off',
		roles: List(fromJS([]))
	})
});

export const actionHandlers = {
	[actEnums.OPEN_FROM_STATE]: (state, {code, ...contragent}) => {
		return state.setIn([code], Map({
			loading: false,
			errors: null,
			success: null,

			name: contragent.name,
			password: contragent.password,
			locked: contragent.locked,
			roles: List(fromJS(contragent.roles))
		}))
	},

	[actEnums.EDIT_CONTRAGENT.REQUEST]: (state, {code, ...contragent}) => {
		return state.setIn([code], Map({
			loading: true,
			errors: null,
			success: null,

			name: contragent.name,
			password: contragent.password,
			locked: contragent.locked,
			roles: List(fromJS(contragent.roles))
		}));
	},
	[actEnums.EDIT_CONTRAGENT.SUCCESS]: (state, {code, ...contragent}) => {
		return state.setIn([code], Map({
			loading: false,
			errors: null,
			success: true,

			name: contragent.name || '',
			password: contragent.password || '',
			locked: contragent.locked || '',
			roles: List(fromJS(contragent.roles || []))
		}));
	},
	[actEnums.EDIT_CONTRAGENT.FAILURE]: (state, code) => {
		return state.setIn([code], Map({
			loading: false,
			errors: true,
			success: null
		}));
	},

	[actEnums.DELETE_CONTRAGENT]: (state, {code}) => {
		return state.setIn([code], Map({
			loading: true,
			errors: null,
			success: null
		}));
	},

	[actEnums.CLEAR_STATE]: (state, {code}) => {
		return state.updateIn([code], item => initialState.get('newItem'));
	}
};