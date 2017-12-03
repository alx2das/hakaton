import {createAction, createRequestTypes} from 'infrastructure/helpers/actionHelpers'


// Enums
export const CHECK_CONNECT = createRequestTypes('HUNTER_STATISTIC.CHECK_CONNECT');
export const GET_RETAIL_POINTS = createRequestTypes('HUNTER_STATISTIC.GET_RETAIL_POINTS');


// Actions
export const checkConnect = {
    request: (req) => createAction(CHECK_CONNECT.REQUEST, req),
    success: (res) => createAction(CHECK_CONNECT.SUCCESS, res),
    failure: () => createAction(CHECK_CONNECT.FAILURE)
};
export const getRetailPoints = {
    request: (req) => createAction(GET_RETAIL_POINTS.REQUEST, req),
    success: (res) => createAction(GET_RETAIL_POINTS.SUCCESS, res),
    failure: () => createAction(GET_RETAIL_POINTS.FAILURE)
};
