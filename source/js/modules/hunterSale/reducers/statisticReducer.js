import {Map, List, fromJS} from 'immutable'
import * as enums from '../actions/statisticActions'


const initialState = Map({
    pointsLoading: true,
    pointLoading: false,


    actRPointID: null,
    rPoint: List([]),
    statistics: Map({})
});

const actionHandlers = {
    // получить список торг.точек
    [enums.GET_RETAIL_POINTS.REQUEST]: (state, req) => {
        return state.merge({
            pointsLoading: true
        })
    },
    [enums.GET_RETAIL_POINTS.SUCCESS]: (state, {res}) => {
        return state.merge({
            pointsLoading: false,

            actRPointID: res && res.length > 1 ? null : res[0].uuid,
            rPoint: fromJS(res)
        })
    },
    [enums.GET_RETAIL_POINTS.FAILURE]: (state) => {
        console.log(enums.GET_RETAIL_POINTS.FAILURE);
        return state.merge({
            pointsLoading: false,
            error: true
        })
    },

    [enums.GET_STATISTICS.REQUEST]: (state, req) => {
        return state.merge({
            pointLoading: true
        })
    },
    [enums.GET_STATISTICS.SUCCESS]: (state, res) => {
        return state.merge({
            pointLoading: false,
            statistics: fromJS({
                challange: res.challange,
                statisticItems: res.statisticItems
            })
        })
    },
    [enums.GET_STATISTICS.FAILURE]: (state) => {
        return state.merge({
            pointLoading: false,
            error: true
        })
    }
};


export default (createReducer) => createReducer(initialState, actionHandlers);