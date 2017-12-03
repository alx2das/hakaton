import {Map, fromJS} from 'immutable'
import * as enums from '../actions/statisticActions'


const initialState = Map({
    loading: true,
    error: null
});

const actionHandlers = {
    [enums.CHECK_CONNECT.REQUEST]: (state, req) => {
        return state.merge({
            loading: true
        })
    },
    [enums.CHECK_CONNECT.SUCCESS]: (state, res) => {
        return state.merge({
            loading: false
        })
    },
    [enums.CHECK_CONNECT.FAILURE]: (state, ) => {
        return state.merge({
            loading: false,
            error: true
        })
    },

    // получить список торг.точек
    [enums.GET_RETAIL_POINTS.REQUEST]: (state, req) => {
        return state.merge({
            loading: true
        })
    },
    [enums.GET_RETAIL_POINTS.SUCCESS]: (state, res) => {
        return state.merge({
            loading: false
        })
    },
    [enums.GET_RETAIL_POINTS.FAILURE]: (state) => {
        return state.merge({
            loading: false,
            error: true
        })
    }
};


export default (createReducer) => createReducer(initialState, actionHandlers);