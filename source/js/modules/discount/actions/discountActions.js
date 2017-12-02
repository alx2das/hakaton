import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'
import {createAction} from 'infrastructure/helpers/actionHelpers'


// Enums
export const GET_LIST = createRequestTypes('DISCOUNT.GET_LIST');
export const OPEN_FROM_STATE = 'DISCOUNT.OPEN_FROM_STATE';
export const LOAD_DETAIL = 'DISCOUNT.LOAD_DETAIL';

export const EDIT_DISCOUNT = createRequestTypes('DISCOUNT.EDIT_DISCOUNT');
export const DELETE_DISCOUNT = 'DISCOUNT.DELETE_DISCOUNT';


// Actions
export const getListDiscount = {
	request: (req) => createAction(GET_LIST.REQUEST, req),
	success: (res) => createAction(GET_LIST.SUCCESS, res),
	failure: (err) => createAction(GET_LIST.FAILURE)
};

export const openDiscount = (discount) => createAction(OPEN_FROM_STATE, discount);
export const loadingDetail = ({code}) => createAction(LOAD_DETAIL, {code});
export const editDiscount = {
	request: (req) => createAction(EDIT_DISCOUNT.REQUEST, req),
	success: (res) => createAction(EDIT_DISCOUNT.SUCCESS, res),
	failure: (code) => createAction(EDIT_DISCOUNT.FAILURE, code)
};
export const deleteDiscount = (code) => createAction(DELETE_DISCOUNT, {code});