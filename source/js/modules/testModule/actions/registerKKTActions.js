import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'
import {createAction} from 'infrastructure/helpers/actionHelpers'


// Enums
export const UPDATE_STATUS = createRequestTypes('TEST_REGISTER_KKT.UPDATE_STATUS');


// Actions
export const updateStatus = {
	request: (req) => createAction(UPDATE_STATUS.REQUEST, req),
	success: (res) => createAction(UPDATE_STATUS.SUCCESS, res),
	failure: () => createAction(UPDATE_STATUS.FAILURE)
};
