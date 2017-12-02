import {HOT_KEY_TYPE, COLORS, DEFAULT_COLOR, COLORS_INVERTED} from '../enums/enums';
import {schema, normalize} from 'normalizr';
import {uuid} from 'infrastructure/utils/uuidGenerator'

const hotKeysSchema = new schema.Entity('hotKeys');
const tabSchema = new schema.Entity('tabs', {hotKeys: [hotKeysSchema]}, {idAttribute: 'code'});
const tabListShema = [tabSchema];

export const toClientTab = tab => {
	return {
		code: tab.code,
		name: tab.name,
		order: tab.order,
		hotKeys: (tab.hotKeys || [])
			.map((key, i) => toClientHotKey(key, tab.code))
	};
};

export const toServerTab = tab => {

	const convertColor = color => color ? COLORS_INVERTED[color.replace('#')] : COLORS_INVERTED[DEFAULT_COLOR.replace('#')];
	return {
		code: tab.code,
		name: tab.name,
		order: tab.order,
		hotKeys: tab.hotKeys.reduce((keys, key) => {
			const mappedKey = {
				name: key.name,
				barcode: key.barcode,
				row: key.row,
				col: key.col,
				width: key.width,
				height: key.height,
				color: convertColor(key.color),
				actions: []
			};
			if (key.type === HOT_KEY_TYPE.PRODUCT) {
				mappedKey.actions.push({actionType: "barcode", barcode: key.barcode});
				keys.push(mappedKey);
			} else if (key.type === HOT_KEY_TYPE.CATEGORY) {
				mappedKey.actions.push({actionType: "goodsgroup", goodsGroupId: key.groupcode});
				keys.push(mappedKey);
			}
			return keys;
		}, [])
	};
};

const toClientHotKey = (model, tabCode) => {
	let hotKey = {
		id: uuid(),
		tabCode: tabCode,
		name: model.name,
		barcode: model.barcode,
		groupcode: null,
		row: model.row,
		col: model.col,
		width: model.width,
		height: model.height,
		color: COLORS[model.color] || DEFAULT_COLOR
	};

	const action = model.actions && model.actions.length > 0 ? model.actions[0] : {};
	if (action.actionType === 'barcode') {
		hotKey.type = HOT_KEY_TYPE.PRODUCT;
	}
	else if (action.actionType === 'goodsgroup') {
		hotKey.type = HOT_KEY_TYPE.CATEGORY;
		hotKey.groupcode = action.goodsGroupId;
	}

	return hotKey;
};

export const toClientTabList = (result) => {
	const tabList = result.data.map(toClientTab).sort((a, b) => a.order > b.order);
	const tabs = normalize(tabList, tabListShema);
	return {pos: result.pos, totalCount: result.total_count, tabList: tabs};
};