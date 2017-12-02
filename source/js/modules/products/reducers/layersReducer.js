import {Map, fromJS} from 'immutable';
import * as actions from '../actions/layerActions'

export const initialState = Map({
	layers: Map({})
});

export const actionHandlers = {
	[actions.INIT_LAYER]: (state, {layerId}) => {
		return state.setIn(['layers', layerId], fromJS({closed: false}));
	},
	[actions.DESTROY_LAYER]: (state, {layerId}) => {
		return state.deleteIn(['layers', layerId]);
	},
	[actions.UPDATE_LAYER]: (state, {layerId, type, ...props}) => {
		return state.mergeIn(['layers', layerId], fromJS({...props}));
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);