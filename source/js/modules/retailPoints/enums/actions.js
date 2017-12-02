import {createRequestTypes} from 'infrastructure/helpers/actionHelpers';


export const GET_RETAIL_POINT = createRequestTypes('RETAIL_POINTS.GET_RETAIL_POINT');//получение торг. точки
export const GET_RETAIL_POINTS = createRequestTypes('RETAIL_POINTS.GET_RETAIL_POINTS');//получение торг. точек
export const SET_RETAIL_POINT = 'RETAIL_POINTS.SET_RETAIL_POINT'; //установка торговой точки
export const ADD_RETAIL_POINT = createRequestTypes('RETAIL_POINTS.ADD_RETAIL_POINT');//добавление торг. точек
export const SET_EMPTY_RETAIL_POINT_IN_LAYER = 'RETAIL_POINTS.SET_EMPTY_RETAIL_POINT_IN_LAYER'; //пустая торговая точка
export const CREATE_RETAIL_POINT = 'RETAIL_POINTS.CREATE_RETAIL_POINT'; //добавление торговой точки
export const EDIT_RETAIL_POINT = createRequestTypes('RETAIL_POINTS.EDIT_RETAIL_POINT');//редактирование торг. точки
export const DELETE_RETAIL_POINT = createRequestTypes('RETAIL_POINTS.DELETE_RETAIL_POINT');//удаление торг. точки
export const UPDATE_STATUS = 'RETAIL_POINTS.UPDATE_STATUS'; // обновит статусы при изменениях
export const SHOW_ERROR_POPUP = 'RETAIL_POINTS.SHOW_ERROR_POPUP'; // показ попапа при ошибке ККТ
