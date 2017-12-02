import {createAction, createRequestTypes} from 'infrastructure/helpers/actionHelpers'


// Enums
export const CHECK_CONNECT = createRequestTypes('HUNTER_STATISTIC.CHECK_CONNECT');

// Actions
export const checkConnect = {
    request: (req) => createAction(CHECK_CONNECT.REQUEST, req),
    success: (res) => createAction(CHECK_CONNECT.SUCCESS, res),
    failure: () => createAction(CHECK_CONNECT.FAILURE)
};