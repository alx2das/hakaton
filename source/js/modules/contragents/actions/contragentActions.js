import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'
import {createAction} from 'infrastructure/helpers/actionHelpers'


// Enums
export const GET_LIST = createRequestTypes('CONTRAGENTS.GET_LIST');
export const OPEN_FROM_STATE = 'CONTRAGENTS.OPEN_FROM_LIST';
export const LOAD_DETAIL = 'CONTRAGENTS.LOAD_DETAIL';

export const EDIT_CONTRAGENT = createRequestTypes('CONTRAGENTS.EDIT_CONTRAGENT');
export const DELETE_CONTRAGENT = 'CONTRAGENTS.DELETE_CONTRAGENT';
export const CLEAR_STATE = 'CONTRAGENTS.CLEAR_STATE';


// Actions
export const getListContragents = {
	request: (req) => createAction(GET_LIST.REQUEST, req),
	success: (res) => createAction(GET_LIST.SUCCESS, res),
	failure: (err) => createAction(GET_LIST.FAILURE)
};

export const openContragent = (contragent) => createAction(OPEN_FROM_STATE, contragent);
export const loadingDetail = ({code}) => createAction(LOAD_DETAIL, {code});
export const editContragent = {
	request: (req) => createAction(EDIT_CONTRAGENT.REQUEST, req),
	success: (res) => createAction(EDIT_CONTRAGENT.SUCCESS, res),
	failure: (code) => createAction(EDIT_CONTRAGENT.FAILURE, code)
};
export const deleteContragent = (code) => createAction(DELETE_CONTRAGENT, {code});
export const clearStateContragent = (code) => createAction(CLEAR_STATE, {code});