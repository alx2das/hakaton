import {Map, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: false,
	error: null,
	success: null
});

export const actionHandlers = {

	[actions.FORGOT.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			error: null,
			success: false
		});
	},

	[actions.FORGOT.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			success: true
		});
	},

	[actions.FORGOT.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: fromJS(action.error),
			success: false
		});
	},

	[actions.FORGOT_RESET]: (state) => {
		return initialState;
	}

};

export default (createReducer) => createReducer(initialState, actionHandlers);
