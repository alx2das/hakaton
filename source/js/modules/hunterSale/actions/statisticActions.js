import {createAction, createRequestTypes} from 'infrastructure/helpers/actionHelpers'


// Enums
export const GET_RETAIL_POINTS = createRequestTypes('HUNTER_STATISTIC.GET_RETAIL_POINTS');
export const GET_STATISTICS = createRequestTypes('HUNTER_STATISTIC.GET_STATISTICS');


// Actions
export const getRetailPoints = {
    request: (req) => createAction(GET_RETAIL_POINTS.REQUEST, req),
    success: (res) => createAction(GET_RETAIL_POINTS.SUCCESS, res),
    failure: () => createAction(GET_RETAIL_POINTS.FAILURE)
};
export const getStatistics = {
    request: (pointID) => createAction(GET_STATISTICS.REQUEST, {uid: pointID}),
    success: (res) => createAction(GET_STATISTICS.SUCCESS, res),
    failure: (pointID) => createAction(GET_STATISTICS.FAILURE, {uid: pointID})
};
