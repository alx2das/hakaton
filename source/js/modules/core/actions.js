import {createAction} from 'infrastructure/helpers/actionHelpers'

export const CLEAR_APP = '@@core/CLEAR_APP'; //убиваем стор при выходе из приложения
export const POINT_READY = '@@core/POINT_READY';//профиль готов к работе с точкой
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';//смена урл
export const GLOBAL_SAGA_ERROR = '@@core/GLOBAL_SAGA_ERROR'; //ошибка в сагах

export const pointReady = () => createAction(POINT_READY);