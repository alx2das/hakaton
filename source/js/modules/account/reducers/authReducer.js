import {Map, fromJS} from 'immutable';
import {LOGIN, LOGOUT, CHECKING_ACCESS_STOP, CHECKING_ACCESS_START, LOGIN_RESET, CHANGE_PASSWORD} from '../enums/actions';

export const initialState = Map({
	loading: false,
	authError: null,
	authData: null,
	appReady: false,
	logout: false
});

export const actionHandlers = {

	[LOGIN.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			authError: null,
			authData: null,
		});
	},

	[LOGIN.SUCCESS]: (state, {profile}) => {
		return state.merge({
			//loading: false,
			authError: null,
			authData: fromJS(profile),
		});
	},

	[LOGIN.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			authError: fromJS(action.error),
			authData: null,
		});
	},

	[LOGOUT]: (state, action) => {
		return state.merge({logout: true});
	},

	[LOGIN_RESET]: (state, action) => {
		return state.merge({
			loading: false,
			authError: null
		});
	},

	[CHECKING_ACCESS_START]: (state, action) => {
		return state.merge({appReady: false});
	},

	[CHECKING_ACCESS_STOP]: (state, action) => {
		return state.merge({appReady: true});
	},

};

export default (createReducer) => createReducer(initialState, actionHandlers);
