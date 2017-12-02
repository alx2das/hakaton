import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'
import {createAction} from 'infrastructure/helpers/actionHelpers'


// Enums
export const GET_STATE = createRequestTypes('SETTING_SERVICE.GET_STATE');
export const CHECK_SAVE_INTEGRATION = createRequestTypes('SETTING_SERVICE.CHECK_SAVE_INTEGRATION');
export const DISABLE_INTEGRATION = createRequestTypes('SETTING_SERVICE.DISABLE_INTEGRATION');
export const UPDATE_STATE = 'SETTING_SERVICE.UPDATE_STATE';
export const CLEAR_FORM = 'SETTING_SERVICE.CLEAR_FORM';


// Actions
export const getState = {
	request: () => createAction(GET_STATE.REQUEST),
	success: (response) => createAction(GET_STATE.SUCCESS, {response}),
	failure: (error) => createAction(GET_STATE.FAILURE, {error})
};
export const checkSaveIntegration = {
	request: ({msLogin, msPassword, save = true}) => createAction(CHECK_SAVE_INTEGRATION.REQUEST, {msLogin, msPassword, save}),
	success: (checked) => createAction(CHECK_SAVE_INTEGRATION.SUCCESS, {checked}),
	failure: (error) => createAction(CHECK_SAVE_INTEGRATION.FAILURE, {error})
};
export const disableIntegration = {
	request: () => createAction(DISABLE_INTEGRATION.REQUEST),
	success: () => createAction(DISABLE_INTEGRATION.SUCCESS),
	failure: (error) => createAction(DISABLE_INTEGRATION.FAILURE, {error})
};
export const updateState = (action) => createAction(UPDATE_STATE, {action});
export const clearForm = (action) => createAction(CLEAR_FORM);
