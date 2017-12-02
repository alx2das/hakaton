import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

export const GET_LIST = createRequestTypes('DISCOUNT.GET_LIST');
export const CREATE = createRequestTypes('DISCOUNT.CREATE');
export const UPDATE = createRequestTypes('DISCOUNT.UPDATE');
export const DELETE = createRequestTypes('DISCOUNT.DELETE');
export const OPEN_FROM_LIST = 'DISCOUNT.OPEN_FROM_LIST';
export const CLOSE_LAYER = 'DISCOUNT.CLOSE_LAYER';
export const LOAD_DETAIL = createRequestTypes('DISCOUNT.LOAD_DETAIL');