import * as actions from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

// region Операции с табами
/**
 * Получение списка табов с хоткеями
 * @type {{request: (()=>{type: *}), success: ((p1:{hotKeys: *})=>{type: *}), failure: ((p1:{error: *})=>{type: *})}}
 */
export const getHotKeysList = {
	request: ({start, count}) => createAction(actions.GET_HOT_KEYS.REQUEST, {start, count}),
	success: ({pos, totalCount, tabList}) => createAction(actions.GET_HOT_KEYS.SUCCESS, {pos, totalCount, tabList}),
	failure: ({error}) => createAction(actions.GET_HOT_KEYS.FAILURE, {error})
};

/**
 * раскладывание данных табов при загрузке модуля
 * @param tabs
 * @param keys
 * @param pos
 * @param totalCount
 */
export const setTabs = ({tabs, keys, pos, totalCount}) => createAction(actions.SET_TABS, {tabs, keys, pos, totalCount});

/**
 * Сохранение данных таба
 * @type {{request: ((p1:{tab: *})=>{type: *}), success: ((p1:{tab: *})=>{type: *}), failure: ((p1:{tab: *, error: *})=>{type: *})}}
 */
export const saveTab = {
	success: ({tab}) => createAction(actions.SAVE_TAB.SUCCESS, {tab}),
	failure: ({tabCode, error}) => createAction(actions.SAVE_TAB.FAILURE, {tabCode, error})
};

/**
 * Добавление нового таба
 * @type {{request: ((p1:{tab: *})=>{type: *}), success: ((p1:{tab: *})=>{type: *}), failure: ((p1:{tab: *, error: *})=>{type: *})}}
 */
export const createTab = {
	request: ({tab}) => createAction(actions.CREATE_TAB.REQUEST, {tab}),
	success: ({tab}) => createAction(actions.CREATE_TAB.SUCCESS, {tab}),
	failure: ({tab, error}) => createAction(actions.CREATE_TAB.FAILURE, {tab, error})
};

/**
 * Добавление нового таба
 * @type {{request: ((p1:{tab: *})=>{type: *}), success: ((p1:{tab: *})=>{type: *}), failure: ((p1:{tab: *, error: *})=>{type: *})}}
 */
export const removeTab = {
	request: ({code}) => createAction(actions.REMOVE_TAB.REQUEST, {code}),
	success: ({code}) => createAction(actions.REMOVE_TAB.SUCCESS, {code}),
	failure: ({code, error}) => createAction(actions.REMOVE_TAB.FAILURE, {code, error})
};

export const newTab = () => createAction(actions.NEW_TAB);
export const selectTab = ({code}) => createAction(actions.SELECT_TAB, {code});
export const updateTab = ({tab}) => createAction(actions.UPDATE_TAB, {tab});

// region Операции с кнопками

export const addKey = ({cords, tabCode}) => createAction(actions.ADD_KEY, {cords, tabCode});
export const selectKey = ({id}) => createAction(actions.SELECT_KEY, {id});
export const saveKey = ({key}) => createAction(actions.SAVE_KEY, {key});
export const cancelKey = () => createAction(actions.CANCEL_KEY);
export const removeKey = ({key, tabCode}) => createAction(actions.REMOVE_KEY, {key, tabCode});
export const updateSelectedKey = ({key}) => createAction(actions.UPDATE_SELECTED_KEY, {key});
export const dragEndKey = ({id, row, col, gridSize}) => createAction(actions.DRAG_END_KEY, {id, row, col, gridSize});

export const searchProduct = {
	request: ({query}) => createAction(actions.SEARCH_PRODUCT.REQUEST, {query}),
	success: ({products}) => createAction(actions.SEARCH_PRODUCT.SUCCESS, {products}),
	failure: ({error}) => createAction(actions.SEARCH_PRODUCT.FAILURE, {error})
};
export const clearStateProduct = () => createAction(actions.CLEAR_STATE_PRODUCT);

export const searchCategory = {
	request: ({query}) => createAction(actions.SEARCH_CATEGORY.REQUEST, {query}),
	success: ({categories}) => createAction(actions.SEARCH_CATEGORY.SUCCESS, {categories}),
	failure: ({error}) => createAction(actions.SEARCH_CATEGORY.FAILURE, {error})
};
export const clearStateCategories = () => createAction(actions.CLEAR_STATE_CATEGORIES);

export const get = {
	success: ({products}) => createAction(actions.SEARCH_CATEGORY.SUCCESS, {products}),
	failure: ({error}) => createAction(actions.SEARCH_CATEGORY.FAILURE, {error})
};


// region Операции с категориями
export const openCategory = ({categoryId, gridSize, tabCode}) => createAction(actions.OPEN_CATEGORY, {
	categoryId,
	gridSize,
	tabCode
});
export const setCategoryKeys = ({keys, finish}) => createAction(actions.SET_CATEGORY_KEYS, {keys, finish});
export const backFromCategory = ({tabCode}) => createAction(actions.BACK_FROM_CATEGORY, {tabCode});

export const destroyTabs = () => createAction(actions.DESTROY_TABS);


