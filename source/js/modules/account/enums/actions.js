import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

//авторизация
export const LOGIN = createRequestTypes('ACCOUNT.LOGIN');
export const LOGIN_RESET = 'ACCOUNT.LOGIN_RESET';
export const LOGOUT = 'ACCOUNT.LOGOUT'; //авторизация
export const CHECKING_ACCESS_START = 'ACCOUNT.CHECKING_ACCESS_START';
export const CHECKING_ACCESS_STOP = 'ACCOUNT.CHECKING_ACCESS_STOP';

//регистрация
export const REGISTER = createRequestTypes('ACCOUNT.REGISTER');
export const REGISTER_RESET = 'ACCOUNT.REGISTER_RESET';
//восстановление пароля
export const FORGOT = createRequestTypes('ACCOUNT.FORGOT');
export const FORGOT_RESET = 'ACCOUNT.FORGOT_RESET';
//смена пароля
export const CHANGE_PASSWORD = createRequestTypes('ACCOUNT.CHANGE_PASSWORD');

// сервисы
export const GET_STATE_INTEGRATION = createRequestTypes('ACCOUNT.GET_STATE_INTEGRATION');
export const CONNECT_INTEGRATION = createRequestTypes('ACCOUNT.CONNECT_INTEGRATION');
export const UPDATE_STATE_INTEGRATION = 'ACCOUNT.UPDATE_STATE_INTEGRATION';
export const DEFAULT_STATE_INTEGRATION = 'ACCOUNT.DEFAULT_STATE_INTEGRATION';
export const CONFIRM_INTEGRATION = createRequestTypes('ACCOUNT.CONFIRM_INTEGRATION');
export const DISABLE_INTEGRATION = createRequestTypes('ACCOUNT.DISABLE_INTEGRATION');