import {Map, List} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({});

export const actionHandlers = {
	['boiler-actions']: (state, action) => {

	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
