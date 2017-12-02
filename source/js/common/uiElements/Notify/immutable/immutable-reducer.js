import {SHOW_NOTIFICATION, HIDE_NOTIFICATION, REMOVE_ALL_NOTIFICATIONS} from '../actionTypes';
import {List, fromJS} from 'immutable';

export const initialState = List([]);

export const actionHandlers = {

	[SHOW_NOTIFICATION]: (state = initialState, {type, uid, ...rest}) => {
		const notifyEntry = state.findEntry(s => s.get('uid') == uid);
		if (notifyEntry) {
			return state.updateIn([notifyEntry[0]], notify =>
				notify.merge(fromJS({...rest})))
		} else {
			return state.push(fromJS({uid, ...rest}))
		}
	},
	[HIDE_NOTIFICATION]: (state, {uid}) => {
		const notifyEntry = state.findEntry(s => s.get('uid') == uid);
		return notifyEntry ? state.deleteIn([notifyEntry[0]]) : state;
	},

	[REMOVE_ALL_NOTIFICATIONS]: (state, action) => {
		return initialState;
	}
};