import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';
import {DEFAULT_COLOR, HOT_KEY_TYPE} from '../enums/enums'
import {uuid} from 'infrastructure/utils/uuidGenerator'
import createRequestReducer from 'modules/core/reducers/createRequestReducer'

// вернет только уникальные объекты массива по полю "field"
const filterUnique = (array, field) => {
	let used = {};
	return array.filter(obj =>
		obj[field] in used ? false : used[obj[field]] = true
	);
};

const searchProductReducer = createRequestReducer(actions.SEARCH_PRODUCT, ['searchProductsResult'])
	.setRequest((data, {query}) => data.merge({loading: true, query}))
	.setFailure((data, {error}) => data.merge({
		loading: false,
		error: fromJS(error)
	}))
	.setSuccess((data, {products}) => {
		let productsList = filterUnique(data.get('products').concat(fromJS(products)).toJS(), 'inventCode');
		// если на пустой запрос пришел пустой массив, значит на беке нет записей, указываем массив как null, что бы больше запросы не отправлять
		if (!data.get('query') && products.length == 0) {
			productsList = null;
		}
		return data.merge({
			loading: false,
			products: productsList,
			error: null,
			loadCount: products && products.length
		});
	})
	.get();

export default {
	[actions.ADD_KEY]: (state, {cords, tabCode}) => {
		return state.setIn(['selectedKey'], fromJS({
			tabCode: tabCode,
			color: DEFAULT_COLOR,
			row: cords.row,
			col: cords.col,
			width: 1,
			height: 1,
			type: HOT_KEY_TYPE.PRODUCT,
			tempId: cords.tempId
		}))
	},
	[actions.SELECT_KEY]: (state, {id}) => {
		return state.setIn(['selectedKey'], state.getIn(['keysList', id]));
	},
	[actions.CANCEL_KEY]: (state) => {
		return state.deleteIn(['selectedKey']);
	},
	[actions.REMOVE_KEY]: (state, {key}) => {
		return state.deleteIn(['selectedKey'])
			.deleteIn(['keysActive', key])
			.deleteIn(['keysList', key]);
	},

	[actions.UPDATE_SELECTED_KEY]: (state, {key}) => {
		return state.updateIn(['selectedKey'], k => k.merge(fromJS(key)));
	},
	[actions.SAVE_KEY]: (state, {key}) => {
		key.tempId = null;
		if (!key.id) {
			key.id = uuid();
			const keyObj1 = fromJS(key);
			return state.update('selectedKey', () => null)
				.setIn(['keysActive', key.id], keyObj1)
				.setIn(['keysList', key.id], keyObj1);
		} else {
			const keyObj2 = fromJS(key);
			return state.update('selectedKey', () => null)
				.mergeIn(['keysActive', key.id], keyObj2)
				.mergeIn(['keysList', key.id], keyObj2);
		}


	},

	...searchProductReducer,

	[actions.SEARCH_CATEGORY.REQUEST]: (state) => {
		return state.updateIn(['searchGroupsResult', 'loading'], true, _ => true);
	},
	[actions.SEARCH_CATEGORY.SUCCESS]: (state, {categories}) => {
		let categoriesList = filterUnique(state.get('searchGroupsResult').get('categories').concat(fromJS(categories)).toJS(), 'groupcode');
		// если на пустой запрос пришел пустой массив, значит на беке нет записей, указываем массив как null, что бы больше запросы не отправлять
		if (!state.get('searchGroupsResult').get('query') && categories.length == 0) {
			categoriesList = null;
		}
		return state.updateIn(['searchGroupsResult'], data => data.merge({
			loading: false,
			categories: categoriesList,
			error: null,
			loadCount: categories && categories.length
		}));
	},
	[actions.SEARCH_CATEGORY.FAILURE]: (state, {error}) => {
		return state.updateIn(['searchGroupsResult'], data => data.merge({
			loading: false,
			error: fromJS(error)
		}));
	},
	[actions.SET_CATEGORY_KEYS]: (state, {keys, finish}) => {
		return state.merge({
			freezeMode: true,
			loadingProducts: !finish,
			keysActive: fromJS(keys)
		});
	},
	[actions.OPEN_CATEGORY]: (state) => {
		return state.merge({
			freezeMode: true,
			loadingProducts: true
		});
	},
	[actions.BACK_FROM_CATEGORY]: (state) => {
		return state.merge({
			freezeMode: false
		});
	}
};
