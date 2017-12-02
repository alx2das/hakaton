import * as actions from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const getRetailPoints = {
	request: () => createAction(actions.GET_RETAIL_POINTS.REQUEST),
	success: (response) => createAction(actions.GET_RETAIL_POINTS.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_RETAIL_POINTS.FAILURE, {error})
};

export const addRetailPoint = {
	request: (point) => createAction(actions.ADD_RETAIL_POINT.REQUEST, {point}),
	success: (response) => createAction(actions.ADD_RETAIL_POINT.SUCCESS, {response}),
	failure: (error) => createAction(actions.ADD_RETAIL_POINT.FAILURE, {error})
};

export const editRetailPoint = {
	request: (point) => createAction(actions.EDIT_RETAIL_POINT.REQUEST, {point}),
	success: (response) => createAction(actions.EDIT_RETAIL_POINT.SUCCESS, {response}),
	failure: (error) => createAction(actions.EDIT_RETAIL_POINT.FAILURE, {error})
};

export const setRetailPoint = (id) => createAction(actions.SET_RETAIL_POINT, {id});

export const setEmptyRetailPointInLayer = (id, isFirstPoint) => createAction(actions.SET_EMPTY_RETAIL_POINT_IN_LAYER, {id, isFirstPoint});

export const getRetailPoint = {
	request: (id) => createAction(actions.GET_RETAIL_POINT.REQUEST, {id}),
	success: (response) => createAction(actions.GET_RETAIL_POINT.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_RETAIL_POINT.FAILURE, {error})
};

export const deleteRetailPoint = {
	request: (id) => createAction(actions.DELETE_RETAIL_POINT.REQUEST, {id}),
	success: (response) => createAction(actions.DELETE_RETAIL_POINT.SUCCESS, {response}),
	failure: (error) => createAction(actions.DELETE_RETAIL_POINT.FAILURE, {error})
};

export const updateStatusRP = (props) => createAction(actions.UPDATE_STATUS, props);

export const createRetailPoint = () => createAction(actions.CREATE_RETAIL_POINT, {});

export const showErrorPopup = (props) => createAction(actions.SHOW_ERROR_POPUP, props);