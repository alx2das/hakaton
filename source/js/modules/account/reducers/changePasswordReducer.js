import {Map, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: false,
	error: null,
	success: null
});

export const actionHandlers = {

	[actions.CHANGE_PASSWORD.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			error: null,
			success: false
		});
	},

	[actions.CHANGE_PASSWORD.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			success: true
		});
	},

	[actions.CHANGE_PASSWORD.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: fromJS(action.error),
			success: false
		});
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
