import {createAction, createRequestTypes} from 'infrastructure/helpers/actionHelpers'


// Enums
export const GET_OPTIONS = createRequestTypes('HUNTER_OPTIONS.GET_OPTIONS');

// Actions
export const getOptions = {
    request: (req) => createAction(GET_OPTIONS.REQUEST, req),
    success: (res) => createAction(GET_OPTIONS.SUCCESS, res),
    failure: () => createAction(GET_OPTIONS.FAILURE)
};