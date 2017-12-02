import {Map, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: false,
	error: null,
	success: null
});

export const actionHandlers = {
	[actions.REGISTER_RESET]: () => {
		return initialState;
	},
	[actions.REGISTER.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			error: null,
			success: null
		});
	},

	[actions.REGISTER.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			success: true
		});
	},

	[actions.REGISTER.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: fromJS(action.error),
			success: false
		});
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
