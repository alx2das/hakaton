import {call, put, take, takeLatest, takeEvery, select, fork, all, cancel} from 'redux-saga/effects'
import {debounce, debounceFor} from 'redux-saga-debounce-effect'
import * as actions from '../enums/actions'
import * as modifierActions from '../actions/modifierActions'
import * as layerActions from '../actions/layerActions'
import * as modifierSelectors from '../selectors/modifierSelectors'
import * as dataContext from '../dataProvider/productDataContext'
import {getPointId} from 'modules/core/selectors'
import {push} from 'connected-react-router'
import {notify} from 'common/uiElements/Notify'
import {uuid} from 'infrastructure/utils/uuidGenerator'
import GROUP_TYPE from '../enums/modifierGroupType'

export function* saveModifierGroup({group, point, meta}) {
	try {
		if (group.isNew) {
			group.modifiers = group.modifiers || [];
			yield call(dataContext.addModifierGroup, point, group);
		} else {
			/*if (group.modifierGroupType == 'REQUIRED' && group.modifiers.length > 0) {
				if (group.modifiers.filter((item) => item.selected).length == 0) {
					throw new Error('Необходимо выбрать хотя бы 1 модификатор');
				}
			}*/
			yield call(dataContext.saveModifierGroup, point, group);
		}

		yield put(modifierActions.saveGroup.success({group: group}));
		if (!meta) {
			yield put(notify.success(group.isNew ? 'Группа добавлена' : 'Группа обновлена'));
		} else if (meta.success) {
			yield put(notify.success(meta.success));
		}
	}
	catch (error) {
		if (!meta) {
			yield put(notify.error('Не удалось сохранить группу', 'Ошибка'));
		} else if (meta.error) {
			yield put(notify.error(meta.error));
		}
		yield put(modifierActions.saveGroup.failure({groupCode: group.code, error}));

	}
}

function* removeModifierGroup({groupCode, point}) {
	try {
		yield call(dataContext.removeModifierGroup, point, groupCode);
		yield put(modifierActions.removeGroup.success({groupCode}));
	}
	catch (error) {
		yield put(modifierActions.removeGroup.failure({groupCode, error}));
	}
}

function* searchGroups({formKey, query}) {
	try {
		const retailPointId = yield select(getPointId);
		const response = yield call(dataContext.getModifierGroups, retailPointId, 0, 50, query);
		yield put(modifierActions.searchGroups.success({formKey, groups: response.groupsList}));
	}
	catch (error) {
		yield put(modifierActions.searchGroups.failure({formKey, error}));
	}
}

function* openGroup({groupCode, inventCode, point}) {
	if (!groupCode) {
		groupCode = uuid();
		const group = {
			code: groupCode,
			inventCode: inventCode,
			isNew: true,
			name: '',
			modifierGroupType: GROUP_TYPE.OPTIONAL,
			modifiers: []
		};
		yield put(modifierActions.addNewGroup({group}));
	} else {
		yield put(modifierActions.groupReady({groupCode}));
	}
	yield put(push('/product/group', {groupCode, point}));
}

function* updateGroup({groupCode, point, meta, layerId}) {
	const groupImtbl = yield select(modifierSelectors.getGroupByCode(groupCode));
	if (!groupImtbl)
		return;

	const group = groupImtbl.toJS();
	if (layerId) {
		yield fork(updateLayer, layerId);
	}
	yield put(modifierActions.saveGroup.request({group, point, meta}));
}

function* updateLayer(layerId) {
	const task=yield take(actions.SAVE_MODIFIER_GROUP.REQUEST);
	yield put(layerActions.updateLayer({layerId, saving: true}));
	const action = yield take([actions.SAVE_MODIFIER_GROUP.SUCCESS, actions.SAVE_MODIFIER_GROUP.FAILURE])
	if (action.type === actions.SAVE_MODIFIER_GROUP.SUCCESS)
		yield put(layerActions.updateLayer({layerId, saving: false, closed: true}));
	else
		yield put(layerActions.updateLayer({layerId, saving: false, closed: false}));
}

export default function*() {
	yield all([
		takeEvery(actions.SAVE_MODIFIER_GROUP.REQUEST, saveModifierGroup),
		debounce(actions.SEARCH_GROUPS.REQUEST, searchGroups),
		takeEvery(actions.REMOVE_MODIFIER_GROUP.REQUEST, removeModifierGroup),
		takeEvery(actions.OPEN_GROUP, openGroup),
		takeLatest(actions.UPDATE_GROUP, updateGroup),
		debounceFor(actions.UPDATE_GROUP_DEBOUNCE, updateGroup, 1000)
	])
}