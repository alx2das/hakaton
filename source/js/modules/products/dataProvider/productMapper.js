import {uuid} from 'infrastructure/utils/uuidGenerator'
import CATALOG_TYPE from '../enums/catalogType'

export const toServerProduct = (item) => ({
	...item,
	taxMode: item.taxMode === '0' ? null : item.taxMode
});

export const toClientProduct = (item) => {
	return {
		accountingQuantity: item.accountingQuantity,
		additionalPrices: item.additionalPrices,
		alcVolume: item.alcVolume,
		alcoholType: item.alcoholType || 'NO_ALCOHOL',
		articul: item.articul,
		barcode: item.barcode || item.inventCode,
		barcodes: item.barcodes,
		defaultQuantity: item.defaultQuantity,
		deptCode: item.deptCode,
		extendedOptions: item.extendedOptions,
		groupId: item.groupId,
		inventCode: item.inventCode,
		inventGroup: item.inventGroup,
		isService: item.isService,
		measure: item.measure || 'pcs',
		minPrice: item.minPrice,
		name: item.name,
		//optionalModifiers: item.optionalModifiers,
		//optionalNoModifiers: item.optionalNoModifiers,
		options: item.options,
		packCapacity: item.packCapacity,
		packingMode: item.packingMode,
		price: item.price,
		printText: item.printText,
		productVCode: item.productVCode,
		remainDate: item.remainDate,
		remainInStock: item.remainInStock,
		//requiredModifiers: item.requiredModifiers,
		//modifiers: mapModifiers(item.requiredModifiers),//todo выпилить
		sellRestrictPeriods: item.sellRestrictPeriods,
		shortName: item.shortName,
		vatTag: item.vatTag || '0',
		taxMode: item.taxMode || '0',
		volume: item.volume,
		catalogType: item.catalogType || ''
	}
};

export const toClient = (data) => {
	let productsList = data.data.map(toClientProduct);
	return {pos: data.pos, totalCount: data.total_count, productsList};
};

export const toClientItemGroups = data => {
	const categoryList = data.data.map(g => ({code: g.code, name: g.name}));
	return {pos: data.pos, totalCount: data.total_count, categoryList};
};

export const toClientImportResult = data => {
	const mapProduct = item => ({
		barcode: item.inventItem.barcode,
		name: item.inventItem.name,
		rowNumber: item.rowNumber
	});
	return {
		successCount: data.successfullyImportedCnt || 0,
		failedCount: data.failedToImportCnt || 0,
		ignoredSheets: data.ignoredSheets || [],
		importResults: data.importResults.map(sheet => ({
				name: sheet.sheetName,
				points: sheet.retailPointNames || [],
				duplicates: (sheet.rowImportDuplicateResults || []).map(mapProduct),
				errors: (sheet.rowImportErrorResults || []).map(s => ({
					error: s.importError,
					rowNumber: s.rowNumber,
					duplicate: s.duplicate
				})),
				success: (sheet.rowImportSuccessResults || []).map(mapProduct)
			}
		))
	}
};

export const toClientModifierGroup = group => {
	group.modifiers = (group.modifiers || []).map(m => toClientModifier(m, group.code));
	return group;
};

export const toClientModifier = (m, groupCode) => {
	m.code = uuid();
	m.selected = m.base;
	m.groupCode = groupCode;
	return m;
};

export const toServerModifierGroup = group => {
	const serverGroup = {...group, catalogType: CATALOG_TYPE.MODIFIER_GROUP};
	serverGroup.modifiers = (group.modifiers || []).map(m =>
		({
			name: m.name,
			goodsName: m.goodsName,
			barcode: m.barcode,
			qty: m.qty,
			price: m.price,
			base: m.selected || false
		}));

	return serverGroup;
};

