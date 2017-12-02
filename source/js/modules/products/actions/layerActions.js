import {createAction} from 'infrastructure/helpers/actionHelpers';

export const INIT_LAYER = '@@core/INIT_LAYER';  //создание хранилища для слоя
export const DESTROY_LAYER = '@@core/DESTROY_LAYER';  //удаление слоя
export const CLOSE_LAYER = '@@core/CLOSE_LAYER';  //обновляем флаг для закрытия слоя
export const UPDATE_LAYER = '@@core/UPDATE_LAYER';  //обновление данных слоя

export const initLayer = ({layerId}) => createAction(INIT_LAYER, {layerId});
export const destroyLayer = ({layerId}) => createAction(DESTROY_LAYER, {layerId});
export const updateLayer = ({layerId, ...props}) => createAction(UPDATE_LAYER, {layerId, ...props});
