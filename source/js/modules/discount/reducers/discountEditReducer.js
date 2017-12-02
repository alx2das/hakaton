import {Map} from 'immutable';
import * as actEnums from '../actions/discountActions'

export const initialState = Map({
	'newItem': Map({
		loading: false,
		errors: null,
		success: null,

		name: '',
		value: ''
	})
});

export const actionHandlers = {
	[actEnums.OPEN_FROM_STATE]: (state, {code, ...discount}) => {
		return state.setIn([code], Map({
			loading: false,
			errors: null,
			success: null,

			name: discount.name,
			value: discount.value + ''
		}))
	},

	[actEnums.EDIT_DISCOUNT.REQUEST]: (state, {code, ...discount}) => {
		return state.setIn([code], Map({
			loading: true,
			errors: null,
			success: null,

			name: discount.name,
			value: discount.value + ''
		}));
	},
	[actEnums.EDIT_DISCOUNT.SUCCESS]: (state, {code, ...discount}) => {
		return state.setIn([code], Map({
			loading: false,
			errors: null,
			success: true,

			name: discount.name || '',
			value: (discount.value || '') + ''
		}));
	},
	[actEnums.EDIT_DISCOUNT.FAILURE]: (state, code) => {
		return state.setIn([code], Map({
			loading: false,
			errors: true,
			success: null
		}));
	},

	[actEnums.DELETE_DISCOUNT]: (state, {code}) => {
		return state.setIn([code], Map({
			loading: true,
			errors: null,
			success: null
		}));
	}
};