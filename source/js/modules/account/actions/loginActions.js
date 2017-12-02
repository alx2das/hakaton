import * as actions from '../enums/actions'
import * as coreActions from 'modules/core/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const login = {
	request: (email, pass, redirectUrl) => createAction(actions.LOGIN.REQUEST, {email, pass, redirectUrl}),
	success: ({profile}) => createAction(actions.LOGIN.SUCCESS, {profile}),
	failure: (error) => createAction(actions.LOGIN.FAILURE, {error})
};

export const logOut = () => createAction(actions.LOGOUT);
export const resetLogin = () => createAction(actions.LOGIN_RESET);
export const checkingAccessStart = () => createAction(actions.CHECKING_ACCESS_START);
export const checkingAccessStop = () => createAction(actions.CHECKING_ACCESS_STOP);
export const clearApp = () => createAction(coreActions.CLEAR_APP);

