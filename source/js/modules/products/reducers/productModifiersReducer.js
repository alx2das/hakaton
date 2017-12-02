import * as actions from '../enums/actions';
import {Map, fromJS} from 'immutable';

export const initialState = Map({
	groups: Map({}),
	searchGroupsResult: Map({}) //результаты поиска группы модификаторов в выпадушке
});

export const actionHandlers = {

	[actions.SET_PRODUCT_MODIFIER_GROUPS]: (state, {groups}) => {
		return state.mergeIn(['groups'], fromJS(groups));
	},

	[actions.ADD_PRODUCT_MODIFIER_GROUP]: (state, {group}) => {
		return state.setIn(['groups', group.code], fromJS(group));
	},
	[actions.GROUP_READY]: (state, {groupCode}) => {
		return state.mergeIn(['groups', groupCode], fromJS({
			isNew: false,
			saved: false,
			saving: false,
			removed: false,
			removing: false
		}))
	},
	[actions.SAVE_MODIFIER_GROUP.REQUEST]: (state, {group}) => {
		return state.mergeIn(['groups', group.code], fromJS({saving: true}));
	},
	[actions.SAVE_MODIFIER_GROUP.SUCCESS]: (state, {group}) => {
		return state.mergeIn(['groups', group.code], fromJS({
			...group,
			isNew: false,
			saved: true,
			saving: false
		}))
	},
	[actions.SAVE_MODIFIER_GROUP.FAILURE]: (state, {groupCode, error}) => {
		return state.mergeIn(['groups', groupCode], fromJS({
			saved: false,
			saving: false,
			savingError: error
		}))
	},
	[actions.REMOVE_MODIFIER_GROUP.REQUEST]: (state, {groupCode}) => {
		return state.mergeIn(['groups', groupCode], fromJS({
			removing: true
		}));
	},
	[actions.REMOVE_MODIFIER_GROUP.SUCCESS]: (state, {groupCode}) => {
		return state.deleteIn(['groups', groupCode]);
	},
	[actions.REMOVE_MODIFIER_GROUP.FAILURE]: (state, {groupCode, error}) => {
		return state.mergeIn(['groups', groupCode], fromJS({
			removing: false,
			error
		}));
	},
	[actions.SAVE_MODIFIER]: (state, {groupCode, modifier}) => {
		const modifierEntry = state.getIn(['groups', groupCode, 'modifiers'])
			.findEntry(s => s.get('code') == modifier.code);

		const modifierImtbl = fromJS(modifier);
		if (modifierEntry) {
			return state.mergeIn(['groups', groupCode, 'modifiers', modifierEntry[0]], modifierImtbl)
		} else {
			return state.updateIn(['groups', groupCode, 'modifiers'], list => list.push(modifierImtbl));
		}
	},

	[actions.REMOVE_MODIFIER]: (state, {groupCode, modifierCode}) => {
		return state.updateIn(['groups', groupCode, 'modifiers'],
			list => list.filter(s => s.get('code') !== modifierCode));
	},

	[actions.TOGGLE_MODIFIER]: (state, {groupCode, modifierCode}) => {
		const modifierEntry = state.getIn(['groups', groupCode, 'modifiers'])
			.findEntry(s => s.get('code') == modifierCode);
		if (modifierEntry) {
			return state.updateIn(['groups', groupCode, 'modifiers', modifierEntry[0]],
				modifier => modifier.merge(fromJS({selected: !modifier.get('selected')}))
			)
		}

		return state;
	},
	[actions.SEARCH_GROUPS.REQUEST]: (state, {formKey}) => {
		return state.updateIn(['searchGroupsResult', formKey], Map({groups: []}), data =>
			data.merge({
				loading: true,
				error: null
			}));
	},
	[actions.SEARCH_GROUPS.SUCCESS]: (state, {formKey, groups}) => {
		return state.updateIn(['searchGroupsResult', formKey], data => data.merge({
			loading: false,
			groups: fromJS(groups),
			error: null
		}));
	},
	[actions.SEARCH_GROUPS.FAILURE]: (state, {formKey, error}) => {
		return state.updateIn(['searchGroupsResult', formKey], data => data.merge({
			loading: false,
			error: fromJS(error)
		}));
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
