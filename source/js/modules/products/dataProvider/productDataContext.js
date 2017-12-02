import api from 'infrastructure/api/api'
import {schema, normalize} from 'normalizr';

const groupSchema = new schema.Entity('groups', {}, {idAttribute: 'code'});
const groupListSchema = [groupSchema];

import {
	toClient,
	toServerProduct,
	toClientProduct,
	toClientImportResult,
	toClientModifierGroup,
	toClientItemGroups,
	toServerModifierGroup
} from './productMapper';

export const getProducts = ({retailPointId, start, count, filter, groupId, sortField = 'name', sortDirection = 'asc'}) => {
	let params = [];
	if (filter)
		params.push(`:quickSearch="${filter}"`);
	if (groupId)
		params.push(`groupId=="${groupId}"`);
	let q = params.join(';');
	return api.v1().retailpoint(retailPointId).catalog().inventory()
		.get({start, count, q, sortDirection, sortField})
		.then(response => toClient(response.data));
};

export const getItemGroups = (retailPointId, start, count, name) => {
	let params = [];
	if (name)
		params.push(`name=="*${name}*"`);
	let q = params.join(';');
	return api.v1().retailpoint(retailPointId).catalog().itemGroups()
		.get({start, count, q})
		.then(response => toClientItemGroups(response.data));
};

export const addModifierGroup = (retailPointId, group) => {
	const serverGroup = toServerModifierGroup(group);
	return api.v1().retailpoint(retailPointId).catalog().post(serverGroup);
};

export const saveModifierGroup = (retailPointId, group) => {
	const serverGroup = toServerModifierGroup(group);
	return api.v1().retailpoint(retailPointId).catalog().put(serverGroup);
};

export const getModifierGroupsByProduct = (retailPointId, inventCode) => {
	const q = `inventCode=="${inventCode}"`;
	return api.v1().retailpoint(retailPointId).catalog().modifierGroups()
		.get({start: 0, count: 1000, q})
		.then(response => {
			const groups = response.data.data.map(toClientModifierGroup);
			const normalizeGroups = normalize(groups, groupListSchema);
			return normalizeGroups.entities.groups;
		});
};

export const removeModifierGroup = (retailPointId, groupCode) => {
	return api.v1().retailpoint(retailPointId).catalog()
		.modifierGroups(groupCode)
		.delete()
};

export const getModifierGroups = (retailPointId, start, count) => {
	return api.v1().retailpoint(retailPointId).catalog().modifierGroups()
		.get({start, count})
		.then(response => {
			return { groupsList: response.data.data }
		});
};


export const getProduct = (retailPointId, inventCode) => {
	return api.v1().retailpoint(retailPointId).catalog().inventory(inventCode)
		.get().then(response => toClientProduct(response.data));
};

export const saveProduct = (retailPointId, product) => {
	return api.v1().retailpoint(retailPointId).catalog()
		.put(toServerProduct(product))
		.then(response => toClientProduct(response.data.catalogEntity));
};

export const removeProduct = (retailPointId, productId) => {
	return api.v1().retailpoint(retailPointId).catalog()
		.inventory(productId)
		.delete()
};


export const addProduct = (retailPointId, product) => {
	return api.v1().retailpoint(retailPointId).catalog()
		.post(toServerProduct(product))
		.then(response => toClientProduct(response.data.catalogEntity));
};

export const uploadProducts = (file) => {
	const headers = {'Skip-Content-Type': true};
	const data = new FormData();
	data.append('file', file);

	return api.v1().uploadCatalog()
		.post(data, headers)
		.then(response => toClientImportResult(response.data));
};