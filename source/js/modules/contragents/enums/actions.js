import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

export const GET_LIST = createRequestTypes('CONTRAGENT.GET_LIST');
export const CHECKED_CASHIER = 'CONTRAGENT.CHECKED_CASHIER';
export const OPEN_FROM_LIST = 'CONTRAGENT.OPEN_FROM_LIST';

export const LOAD_DETAIL = 'CONTRAGENT.LOAD_DETAIL';
// export const CREATE_CONTRAGENT = 'CONTRAGENT.CREATE_CONTRAGENT';


export const CREATE = createRequestTypes('CONTRAGENT.CREATE');
export const UPDATE = createRequestTypes('CONTRAGENT.UPDATE');
export const DELETE = createRequestTypes('CONTRAGENT.DELETE');
// export const CLOSE_LAYER = 'CONTRAGENT.CLOSE_LAYER';
// export const LOAD_DETAIL = createRequestTypes('CONTRAGENT.LOAD_DETAIL');
// export const CHANGE_ROLE = 'CONTRAGENT.CHANGE_ROLE';