import api from 'infrastructure/api/api';
import {toClientList, toServer, toClient} from './retailPointsMapper';
import * as mapper from './retailPointsMapper'


export const getRetailPoints = () => {
	return api.v1().retailpoints().get().then(res => {
		return toClientList(res.data)
	});
};

export const addRetailPoint = (point) => {
	let querystringArr = [];
	if (point.type) {
		let type = point.type;
		if (type === 'BLANK' && point.mock.enabled)
			type = 'DEMO';
		querystringArr.push(`type=${type}`);
	}
	if (point.source) {
		querystringArr.push(`source=${point.source}`);
	}
	let querystring = querystringArr.join('&');
	return api.v1().retailpoints().post(toServer(point), {querystring}).then(res => res.data);
};

export const editRetailPoint = (point) => {
	return api.v1().retailpoint(point.id).put(toServer(point)).then(res => res.data);
};

export const getRetailPoint = ({id}) => {
	return api.v1().retailpoint(id).get().then(res => {
		return toClient(res.data)
	});
};

export const deleteRetailPoint = ({id}) => {
	return api.v1().retailpoint(id).delete().then(() => id);
};


/**
 * ----- Регистрация ККТ в ОФД -----
 * =====================================================================================================================
 */

// GET /api/retail-point/<retailPointID>/registration-request/check
export const getCheckRegKKT = (retailPointID) => {
	return api.v1().retailpoint(retailPointID).registration().check()
		.get();
};

// GET /api/retail-point/<retailPointID>/registration-request
export const getDraftForm = (retailPointID) => {
	return api.v1().retailpoint(retailPointID).registration()
		.get()
		.then(form => mapper.formOFD.toClient(form.data));
};

// PUT /api/retail-point/<retailPointID>/registration-request
export const postSendFormFNS = (retailPointID, form) => {
	return api.v1().retailpoint(retailPointID).registration()
		.put(mapper.formOFD.toServer(form))
};

// GET /api/retail-point/<retailPointID>/cloudsign/session
export const getCloudSign = (retailPointID) => {
	return api.v1().retailpoint(retailPointID).cloudsign().session()
		.get()
		.then(res => mapper.sessionGET.toClient(res.data));
};

// POST /api/retail-point/<retailPointID>/cloudsign/session
export const cloudSign = (retailPointID) => {
	return api.v1().retailpoint(retailPointID).cloudsign().session()
		.post();
};

// POST /api/retail-point/<retailPointID>/cloudsign/session-password
export const sessionPassword = (retailPointID, password) => {
	return api.v1().retailpoint(retailPointID).cloudsign().sessionpassword()
		.post({password});
};

// POST /api/retail-point/<retailPointID>/process
export const regStartProcess = (retailPointID) => {
	return api.v1().retailpoint(retailPointID).registration().process()
		.post();
};

// POST /api/retail-point/<retailPointID>/registration-request/request-report-print
export const sendReportFNS = (retailPointID) => {
	return api.v1().retailpoint(retailPointID).registration().reportprint()
		.post();
};

// PUT /api/retail-point/<retailPointID>
export const installPosLinkToken = (retailPointID, posLinkToken) => {
	return api.v1().retailpoint(retailPointID).put({posLinkToken}).then(res => res.data);
};