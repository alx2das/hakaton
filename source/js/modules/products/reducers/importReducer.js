import {Map, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	uploading: false,
	error: null,
	result: null
});

export const actionHandlers = {

	[actions.IMPORT_PRODUCTS.REQUEST]: (state) => {
		return state.merge({
			uploading: true,
			error: null,
			result: null
		});
	},

	[actions.IMPORT_PRODUCTS.SUCCESS]: (state, action) => {
		return state.merge({
			uploading: false,
			error: null,
			result: fromJS(action.response)
		});
	},

	[actions.IMPORT_PRODUCTS.FAILURE]: (state, action) => {
		return state.merge({
			uploading: false,
			error: fromJS(action.error),
			result: null
		});
	},

	[actions.RESET_IMPORT_LIST]: (state) => {
		return state.merge({
			uploading: false,
			error: null,
			result: null
		});
	},
};

export default (createReducer) => createReducer(initialState, actionHandlers);
