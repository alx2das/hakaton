import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers';

export const saveGroup = {
	request: ({group, point, meta}) => createAction(actions.SAVE_MODIFIER_GROUP.REQUEST, {group, point, meta}),
	success: ({group}) => createAction(actions.SAVE_MODIFIER_GROUP.SUCCESS, {group}),
	failure: ({groupCode, error}) => createAction(actions.SAVE_MODIFIER_GROUP.FAILURE, {groupCode, error})
};

export const setProductModifierGroups = ({groups}) => createAction(actions.SET_PRODUCT_MODIFIER_GROUPS, {groups});

export const removeGroup = {
	request: ({groupCode, point}) => createAction(actions.REMOVE_MODIFIER_GROUP.REQUEST, {groupCode, point}),
	success: ({groupCode}) => createAction(actions.REMOVE_MODIFIER_GROUP.SUCCESS, {groupCode}),
	failure: ({groupCode, error}) => createAction(actions.REMOVE_MODIFIER_GROUP.FAILURE, {groupCode, error})
};

export const updateGroup = ({groupCode, point, meta, layerId}) => createAction(actions.UPDATE_GROUP, {
	groupCode, point, meta, layerId
});
export const updateGroupDebounce = ({groupCode, point, meta, layerId}) => createAction(actions.UPDATE_GROUP_DEBOUNCE, {
	groupCode, point, meta, layerId
});

export const addNewGroup = ({group}) => createAction(actions.ADD_PRODUCT_MODIFIER_GROUP, {group});
export const openGroup = ({groupCode, point, inventCode}) => createAction(actions.OPEN_GROUP, {
	groupCode, point, inventCode
});
export const groupReady = ({groupCode}) => createAction(actions.GROUP_READY, {groupCode});

export const saveModifier = ({groupCode, modifier}) => createAction(actions.SAVE_MODIFIER, {
	groupCode,
	modifier
});

export const removeModifier = ({groupCode, modifierCode}) => createAction(actions.REMOVE_MODIFIER, {
	groupCode, modifierCode
});

export const toggleModifier = ({groupCode, modifierCode}) => createAction(actions.TOGGLE_MODIFIER, {
	groupCode, modifierCode
});


export const searchGroups = {
	request: ({formKey, query}) => createAction(actions.SEARCH_GROUPS.REQUEST, {formKey, query}),
	success: ({formKey, groups}) => createAction(actions.SEARCH_GROUPS.SUCCESS, {formKey, groups}),
	failure: ({formKey, error}) => createAction(actions.SEARCH_GROUPS.FAILURE, {formKey, error})
};
