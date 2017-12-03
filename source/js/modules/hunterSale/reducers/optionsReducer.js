import {Map, fromJS} from 'immutable'
import * as enums from '../actions/optionsActions'


const initialState = Map({
    loading: true,
    saving: false,

    options: Map({})
});

const actionHandlers = {
    // получить список торг.точек
    [enums.GET_OPTIONS.REQUEST]: (state, req) => {
        return state.merge({
            loading: true
        })
    },
    [enums.GET_OPTIONS.SUCCESS]: (state, {type, ...res}) => {
        return state.merge({
            loading: false,
            options: fromJS(res)
        })
    },
    [enums.GET_OPTIONS.FAILURE]: (state) => {
        console.log(enums.GET_RETAIL_POINTS.FAILURE);
        return state.merge({
            loading: false,
            error: true
        })
    },

};


export default (createReducer) => createReducer(initialState, actionHandlers);