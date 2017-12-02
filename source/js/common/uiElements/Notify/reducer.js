import {SHOW_NOTIFICATION, HIDE_NOTIFICATION, REMOVE_ALL_NOTIFICATIONS} from './actionTypes';

export const initialState = [];

export const actionHandlers = {

	[SHOW_NOTIFICATION]: (state = initialState, action) => {
		const {type, uid, ...rest} = action;
		return [
			...state,
			{...rest, uid: uid}
		];
	},
	[HIDE_NOTIFICATION]: (state, action) => {
		return state.filter(notification => {
			return notification.uid !== action.uid;
		});
	},
	[REMOVE_ALL_NOTIFICATIONS]: (state, action) => {
		return initialState;
	}
};

