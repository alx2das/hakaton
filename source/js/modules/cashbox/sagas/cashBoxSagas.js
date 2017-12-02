import {call, put, fork, takeEvery, select, all} from 'redux-saga/effects'
import * as actions from '../actions/actionTypes'
import * as actionEnum from '../enums/actions'
import * as dataContext from '../dataProvider/dataContext'
import * as productDataContext from 'modules/products/dataProvider/productDataContext'
import logger from 'infrastructure/utils/logger'
import {getPointId} from 'modules/core/selectors'
import * as tabSelector from '../selectors/tabSelector'
import {uuid} from 'infrastructure/utils/uuidGenerator'
import {notify} from 'common/uiElements/Notify'
import {initialize} from 'redux-form/immutable'
import {debounce} from 'redux-saga-debounce-effect'
import GridCreator from '../helpers/GridCreator'
import GridValidator from '../helpers/GridValidator'
import {HOT_KEY_TYPE, DEFAULT_COLOR} from '../enums/enums'
import createSearchProductsSaga from 'modules/core/sagas/createSearchProductsSaga'
import {isServerError} from 'infrastructure/helpers/errorHelper'
//region tabs

function* getTabs({start, count}) {
	try {
		const retailPointId = yield select(getPointId);
		const {pos, totalCount, tabList} = yield call(dataContext.getTabList, retailPointId, start, count);
		yield put(actions.getHotKeysList.success({pos, totalCount, tabList}));
	}
	catch (error) {
		logger.log(error);
		yield put(actions.getHotKeysList.failure({error}));
		if (!isServerError(error))
			throw error;
	}
}

function* saveTab({tab}) {
	yield call(saveTabAndHotKeys, tab.code);
}

function* saveTabAndHotKeys(tabCode) {
	try {
		const retailPointId = yield select(getPointId);
		const tabSection = yield select(tabSelector.getSection);
		const tabData = tabSection.getIn(['tabList', tabCode]).toJS();
		tabData.hotKeys = tabSection.getIn(['keysList'])
			.filter(s => s.get('tabCode') === tabCode)
			.toList().toJS();
		yield call(dataContext.saveTab, retailPointId, tabData);
		yield put(actions.saveTab.success({tab: tabData}));
	}
	catch (error) {
		logger.log(error);
		yield put(notify.error('Не удалось сохранить вкладку'));
		yield put(actions.saveTab.failure({tabCode, error}));
		if (!isServerError(error))
			throw error;
	}
}

function* removeTab({code}) {
	try {
		const tabs = yield select(tabSelector.getTabs);
		const tab = tabs ? tabs.first() : null;
		if (tab) {
			yield put(actions.selectTab({code: tab.get('code')}));
		} else {
			// yield newTab();
			yield put(actions.selectTab({code: null}));
		}

		const retailPointId = yield select(getPointId);
		yield call(dataContext.removeTab, retailPointId, code);
		yield put(actions.removeTab.success({code}));
	}
	catch (error) {
		logger.log(error);
		yield put(notify.error('Не удалось удалить вкладку'));
		yield put(actions.removeTab.failure({error}));
		if (!isServerError(error))
			throw error;
	}
}

function* setTabs({pos, totalCount, tabList}) {
	const tabs = tabList.entities.tabs || {};
	const tabArray = tabList.result || [];
	const keys = tabList.entities.hotKeys || {};
	//устанавливаем список табов и клавиш
	yield put(actions.setTabs({tabs, keys, totalCount, pos}));

	if (tabArray.length == 0) {
		yield put(actions.selectTab({code: null}));
		/*const tab = yield call(newTab);
		const updatedTabs = {[tab.code]: tab};
		yield put(actions.setTabs({tabs: updatedTabs, keys, totalCount, pos}));*/
	} else {
		// устанавливаем первую табу
		const tab = Object.keys(tabs).reduce((tab, key) => {
			if (tab == null)
				return tabs[key];
			if (tabs[key].order < tab.order)
				return tabs[key];
			return tab;
		}, null);

		yield put(actions.selectTab({code: tab.code}));
	}
}

function* newTab() {
	const tabs = yield select(tabSelector.getTabs);
	const order = tabs.reduce((val, t) => t.get('order') > val ? t.get('order') : val, 0);
	const tab = {
		code: uuid(),
		name: 'Новая вкладка',
		order: order + 1,
		hotKeys: []
	};
	try {
		yield put(actions.createTab.request({tab}));
		yield put(actions.selectTab({code: tab.code}));
		const retailPointId = yield select(getPointId);
		yield call(dataContext.saveTab, retailPointId, tab);
	} catch (e) {
		yield put(notify.error('Не удалось создать вкладку'));
		//yield put(actions.createTab.request({tab}));
		//todo delay save tab?
		if (!isServerError(e))
			throw e;
	}
	return tab;
}

function* debounceSaveTab() {
	yield debounce(actionEnum.UPDATE_TAB, saveTab);
}

//region keys

function* searchCategory({query = ''}) {
	try {
		const retailPointId = yield select(getPointId);
		const response = yield call(productDataContext.getItemGroups, retailPointId, 0, 50, query);
		yield put(actions.searchCategory.success({categories: response.categoryList}));
	}
	catch (error) {
		yield put(actions.searchCategory.failure({error}));
	}
}

function* debounceSearchCategory() {
	yield debounce(actionEnum.SEARCH_CATEGORY.REQUEST, searchCategory);
}

function* debounceSaveKey() {
	yield debounce(actionEnum.SAVE_KEY, saveKey);
}

function* saveKey({key}) {
	yield call(saveTabAndHotKeys, key.tabCode);
}

function* checkDraggedKey({id, row, col, gridSize}) {
	const validator = new GridValidator(gridSize.width, gridSize.height);
	const keys = yield select(tabSelector.getActiveKeys);
	const otherKeys = keys.filter(s => s.get('id') !== id).toJS();
	const key = keys.find(s => s.get('id') === id).toJS();
	if (key == null)
		return;

	const model = {...key, row, col};
	if (validator.isValidCord(model) && !validator.intersect(model, otherKeys)) {
		yield put(actions.saveKey({key: model}));
	}
}

const searchProductQuery = createSearchProductsSaga(actionEnum.SEARCH_PRODUCT);
function* debounceSearchProduct() {
	yield searchProductQuery;
}


//region category
function* openCategory({categoryId, gridSize, tabCode}) {
	const grid = new GridCreator(gridSize.width, gridSize.height);
	grid.add({type: HOT_KEY_TYPE.BACK, tabCode});
	yield put(actions.setCategoryKeys({keys: grid.getResult(), finish: false}));

	try {
		const retailPointId = yield select(getPointId);
		const response = yield call(productDataContext.getProducts, {
			retailPointId,
			start: 0,
			count: grid.getLimit(),
			groupId: categoryId
		});

		response.productsList.forEach(item => {
			grid.add({
				type: HOT_KEY_TYPE.PRODUCT,
				name: item.name,
				color: DEFAULT_COLOR,
				tabCode: tabCode
			})
		});
		yield put(actions.setCategoryKeys({keys: grid.getResult(), finish: true}));
	}
	catch (error) {
		yield put(actions.setCategoryKeys({keys: grid.getResult(), finish: true}));
		yield put(notify.error('Не удалось получить товары для категории'));
		if (!isServerError(error))
			throw error;
	}
}

function* backFromCategory({tabCode}) {
	yield put(actions.selectTab({code: tabCode}));
}

function* removeHotKey({tabCode}) {
	yield call(saveTabAndHotKeys, tabCode);
}

export default function*() {
	yield all([
		//fork(subscribeToUrl, '/hotkeys', init)
		takeEvery(actionEnum.GET_HOT_KEYS.REQUEST, getTabs),
		takeEvery(actionEnum.GET_HOT_KEYS.SUCCESS, setTabs),
		takeEvery(actionEnum.NEW_TAB, newTab),
		takeEvery(actionEnum.REMOVE_TAB.REQUEST, removeTab),
		fork(debounceSaveTab),
		fork(debounceSaveKey),
		fork(debounceSearchCategory),
		fork(debounceSearchProduct),
		takeEvery(actionEnum.OPEN_CATEGORY, openCategory),
		takeEvery(actionEnum.BACK_FROM_CATEGORY, backFromCategory),
		takeEvery(actionEnum.DRAG_END_KEY, checkDraggedKey),
		takeEvery(actionEnum.REMOVE_KEY, removeHotKey)
	])
}