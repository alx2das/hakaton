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

    // сохранение
    [enums.SAVE_OPTIONS.REQUEST]: (state, props) => {
        return state.merge({
            saving: true
        });
    },
    [enums.SAVE_OPTIONS.SUCCESS]: (state, props) => {
        return state.merge({
            saving: false,
            options: fromJS(props)
        });
    },
    [enums.SAVE_OPTIONS.FAILURE]: (state, props) => {
        return state.merge({
            saving: false,
            error: true
        });
    }
};


export default (createReducer) => createReducer(initialState, actionHandlers);