import * as actions from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const register = {
	request: (user) => createAction(actions.REGISTER.REQUEST, {user}),
	success: (response) => createAction(actions.REGISTER.SUCCESS, {response}),
	failure: (error) => createAction(actions.REGISTER.FAILURE, {error})
};

export const forgot = {
	request: (email, captcha) => createAction(actions.FORGOT.REQUEST, {email, captcha}),
	success: (response) => createAction(actions.FORGOT.SUCCESS, {response}),
	failure: (error) => createAction(actions.FORGOT.FAILURE, {error})
};

export const forgotReset = () => createAction(actions.FORGOT_RESET);
export const registerReset = () => createAction(actions.REGISTER_RESET);

export const changePassword = {
	request: ({oldPassword, newPassword}) => createAction(actions.CHANGE_PASSWORD.REQUEST, {oldPassword, newPassword}),
	success: (response) => createAction(actions.CHANGE_PASSWORD.SUCCESS, {response}),
	failure: (error) => createAction(actions.CHANGE_PASSWORD.FAILURE, {error})
};