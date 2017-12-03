import {createAction, createRequestTypes} from 'infrastructure/helpers/actionHelpers'


// Enums
export const GET_OPTIONS = createRequestTypes('HUNTER_OPTIONS.GET_OPTIONS');
export const SAVE_OPTIONS = createRequestTypes('HUNTER_OPTIONS.SAVE_OPTIONS');

// Actions
export const getOptions = {
    request: (req) => createAction(GET_OPTIONS.REQUEST, req),
    success: (res) => createAction(GET_OPTIONS.SUCCESS, res),
    failure: () => createAction(GET_OPTIONS.FAILURE)
};
export const saveOptions = {
    request: (req) => createAction(SAVE_OPTIONS.REQUEST, req),
    success: (res) => createAction(SAVE_OPTIONS.SUCCESS, res),
    failure: () => createAction(SAVE_OPTIONS.FAILURE)
};
