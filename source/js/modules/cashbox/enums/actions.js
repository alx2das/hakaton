import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'
export const GET_HOT_KEYS = createRequestTypes('CASHBOX.GET_HOT_KEYS');
export const SAVE_TAB = createRequestTypes('CASHBOX.SAVE_TAB');
export const CREATE_TAB = createRequestTypes('CASHBOX.CREATE_TAB');
export const REMOVE_TAB = createRequestTypes('CASHBOX.REMOVE_TAB');
export const SET_TABS = 'CASHBOX.SET_TABS';
export const NEW_TAB = 'CASHBOX.NEW_TAB';
export const SELECT_TAB = 'CASHBOX.SELECT_TAB';
export const UPDATE_TAB = 'CASHBOX.UPDATE_TAB';

export const ADD_KEY = 'CASHBOX.ADD_KEY';
export const SELECT_KEY = 'CASHBOX.SELECT_KEY';
export const SAVE_KEY = 'CASHBOX.SAVE_KEY';
export const CANCEL_KEY = 'CASHBOX.CANCEL_KEY';
export const REMOVE_KEY = 'CASHBOX.REMOVE_KEY';

export const UPDATE_SELECTED_KEY = 'CASHBOX.UPDATE_SELECTED_KEY';
export const DRAG_END_KEY = 'CASHBOX.DRAG_END_KEY';
export const SEARCH_PRODUCT = createRequestTypes('CASHBOX.SEARCH_PRODUCT');
export const CLEAR_STATE_PRODUCT = 'CASHBOX.CLEAR_STATE_PRODUCT';
export const SEARCH_CATEGORY = createRequestTypes('CASHBOX.SEARCH_CATEGORY');
export const CLEAR_STATE_CATEGORIES = 'CASHBOX.CLEAR_STATE_CATEGORIES';

export const OPEN_CATEGORY = 'CASHBOX.OPEN_CATEGORY';
export const SET_CATEGORY_KEYS = 'CASHBOX.SET_CATEGORY_KEYS';
export const BACK_FROM_CATEGORY = 'CASHBOX.BACK_FROM_CATEGORY';

export const DESTROY_TABS = 'CASHBOX.DESTROY_TABS';



