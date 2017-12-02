import api from 'infrastructure/api/api'
import * as mapper from './dataMapper';

export function getOrders(retailPointId, start, count, q, sortField, sortDirection) {
	return api.v1().retailpoint(retailPointId).cashdocs()
		.get({start, count, q, sortField, sortDirection})
		.then(response => {
			return {
				orders: (response.data.data || []).map(mapper.toClientOrder),
				pos: response.data.pos,
				totalCount: response.data.total_count
			}
		});
}

export function deleteOrder({retailPointId, external, cashdocId}) {
	return api.v1().retailpoint(retailPointId).shift(external).cashdoc(cashdocId)
		.delete();
}

export function getOrder(retailPointId, shiftType, orderId) {
	return api.v1().retailpoint(retailPointId)
		.shift(shiftType).cashdoc(orderId).get()
		.then(response => mapper.toClientOrder(response.data));
}

export function getOrderNextNumber(retailPointId) {
	return api.v1().retailpoint(retailPointId)
		.nextExtdocDocnum().get().then(response => response.data);
}

export function getMoneyDocs(retailPointId, start, count, q, sortField, sortDirection) {
	return api.v1().retailpoint(retailPointId).moneyDocs()
		.get({start, count, q, sortField, sortDirection})
		.then(response => {
			return {
				orders: (response.data.data || []).map(mapper.toClientOrder),
				pos: response.data.pos,
				totalCount: response.data.total_count
			}
		});
}

export function saveOrder(retailPointId, shiftType, order) {
	const doc = {
		...order,
		beginDateTime: order.beginDateTime.toISOString()
	};
	return api.v1().retailpoint(retailPointId).shift(shiftType).cashdoc()
		.post(doc);
}

export function getShopDocuments(retailPointId, start, count, q, sortField, sortDirection) {
	return api.fn().v1().retailpoint(retailPointId).docs()
		.get({start, count, q, sortField, sortDirection})
		.then(response => {
			return {
				documents: (response.data.data || []).map(mapper.toClientDocumentFromList),
				pos: response.data.pos,
				totalCount: response.data.total_count
			}
		});
}

export function getShopDocumentDetail(retailPointId, id) {
	return api.fn().v1().retailpoint(retailPointId).docs(id)
		.get()
		.then(response => mapper.toClientDocumentDetails(response.data));
}

export function salesReport(token, beginDate, endDate, email) {
	return api.v1().retailpoint(token).salesReport().get({
		beginDate, endDate, email
	});
}

export function requeueDocument(retailPointId, id) {
	return api.fn().v1().retailpoint(retailPointId)
		.docs(id).requeue().post();
}

export function getChequeDetail(retailPointId, shiftId, chequeId) {
	return api.v1().retailpoint(retailPointId)
		.shift(shiftId).cashdoc(chequeId).get()
		.then(response => mapper.toClientChequeDetail(response.data))
}
