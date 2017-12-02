import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

//PRODUCTS
export const GET_PRODUCTS = createRequestTypes('PRODUCTS.GET_PRODUCTS');
export const ADD_PRODUCT_TO_LIST = 'PRODUCTS.ADD_PRODUCT_TO_LIST';
export const UPDATE_PRODUCT_IN_LIST = 'PRODUCTS.UPDATE_PRODUCT_IN_LIST';
//export const GET_FILTRED_PRODUCTS = createRequestTypes('PRODUCTS.GET_FILTRED_PRODUCTS');
export const SEARCH_PRODUCT_IN_LIST = 'PRODUCTS.SEARCH_PRODUCT_IN_LIST';
export const GET_PRODUCT_DETAIL = createRequestTypes('PRODUCTS.GET_PRODUCT_DETAIL');
export const SAVE_PRODUCT_DETAIL = createRequestTypes('PRODUCTS.SAVE_PRODUCT_DETAIL');
export const REMOVE_PRODUCT = createRequestTypes('PRODUCTS.REMOVE_PRODUCT');

export const RESET_PRODUCTS_LIST = 'PRODUCTS.RESET_PRODUCTS_LIST';
export const SEARCH_PRODUCTS = createRequestTypes('PRODUCTS.SEARCH_PRODUCTS'); //поиск продуктов для выпадушки
export const SET_DEFAULT_SEARCH_PRODUCT = 'PRODUCTS.SET_DEFAULT_SEARCH_PRODUCT'; //установка в выпадайке дефолтного продукта при открытии
export const SEARCH_GROUPS = createRequestTypes('PRODUCTS.SEARCH_GROUPS'); //поиск групп для выпадушки

export const SET_FILTER = 'PRODUCTS.SET_FILTER';
export const CORRECT_FILTER = 'PRODUCTS.CORRECT_FILTER';

//MODIFIERS
export const SAVE_MODIFIER = 'PRODUCTS.SAVE_MODIFIER'; //сохранить модификатор
export const REMOVE_MODIFIER = 'PRODUCTS.REMOVE_MODIFIER'; //удалить модификатор
export const TOGGLE_MODIFIER = 'PRODUCTS.TOGGLE_MODIFIER'; //чекинг модификатора

//MODIFIERS GROUPS
export const SAVE_MODIFIER_GROUP = createRequestTypes('PRODUCTS.SAVE_MODIFIER_GROUP'); //сохранить группу модификатора
export const REMOVE_MODIFIER_GROUP = createRequestTypes('PRODUCTS.REMOVE_MODIFIER_GROUP'); //удалить группу модификатора
export const SET_PRODUCT_MODIFIER_GROUPS = 'PRODUCTS.SET_PRODUCT_MODIFIER_GROUPS';
export const ADD_PRODUCT_MODIFIER_GROUP = 'PRODUCTS.ADD_PRODUCT_MODIFIER_GROUP';
export const UPDATE_GROUP = 'PRODUCTS.UPDATE_GROUP';
export const UPDATE_GROUP_DEBOUNCE = 'PRODUCTS.UPDATE_GROUP_DEBOUNCE';
export const OPEN_GROUP = 'PRODUCTS.OPEN_GROUP';
export const GROUP_READY = 'PRODUCTS.GROUP_READY';


//PRODUCT LAYER
export const CREATE_PRODUCT = 'PRODUCTS.CREATE_PRODUCT'; //Создание балванки для нового продукта
export const SET_NEW_PRODUCT = 'PRODUCTS.SET_NEW_PRODUCT'; //Создание балванки для нового продукта (если перезагрузили страницу)
export const ADD_PRODUCT_DETAIL = 'PRODUCTS.ADD_PRODUCT_DETAIL'; //добавление нового продукта в стор слоя

//IMPORT
export const IMPORT_PRODUCTS = createRequestTypes('PRODUCTS.IMPORT_PRODUCTS'); //импорт продуктов
export const RESET_IMPORT_LIST = 'PRODUCTS.RESET_IMPORT_LIST'; //чистим стор от пред. результата импорта

