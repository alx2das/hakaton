import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'
import {createAction} from 'infrastructure/helpers/actionHelpers'


// Enums
export const UPDATE_LAYER = 'RETAIL_POINTS_REG_KKT.UPDATE_LAYER';									// для изменения активного слоя
export const OPEN_REG_KKT = createRequestTypes('RETAIL_POINTS_REG_KKT.OPEN_REG_KKT');				// открыть регистрацию ККТ
export const SEND_FORM_FNS = createRequestTypes('RETAIL_POINTS_REG_KKT.SEND_FORM_FNS');				// отправить в ФНС
export const SEND_REPORT_REQUEST = 'RETAIL_POINTS_REG_KKT.SEND_REPORT_REQUEST';						// отправить отчет в ФНС
export const CODE_SIGNATURE_DOC = createRequestTypes('RETAIL_POINTS_REG_KKT.CODE_SIGNATURE_DOC');	// запросить смс-код
export const SIGNATURE_DOC = createRequestTypes('RETAIL_POINTS_REG_KKT.SIGNATURE_DOC');				// отправить смс-код
export const CLOSE_REGISTER_KKT = 'RETAIL_POINTS_REG_KKT.CLOSE_REGISTER_KKT';						// вызывается при закрытии слоя рег.ККТ
export const INIT_PULLING = 'RETAIL_POINTS_REG_KKT.INIT_PULLING';									// начальная проверка статусов рег.ККТ
export const INSTALL_LINK_TOKEN = createRequestTypes('RETAIL_POINTS.INSTALL_LINK_TOKEN');			// отправит запрос на генарацию токена привязки


// Actions
export const updateLayer = (retailPointID, newLayer, step, props) => createAction(UPDATE_LAYER, {retailPointID, newLayer, step, props});
export const setInitPulling = (active) => createAction(INIT_PULLING, {active});
export const closeRegisterKKT = (props) => createAction(CLOSE_REGISTER_KKT, props);
export const sendReport = (req) => createAction(SEND_REPORT_REQUEST, req);
export const openRegKKT = {
	request: (req) => createAction(OPEN_REG_KKT.REQUEST, req),
	success: (res) => createAction(OPEN_REG_KKT.SUCCESS, res),
	failure: (err) => createAction(OPEN_REG_KKT.FAILURE, err)
};
export const sendFormFNS = {
	request: (req) => createAction(SEND_FORM_FNS.REQUEST, req),
	success: (res) => createAction(SEND_FORM_FNS.SUCCESS, res),
	failure: (err) => createAction(SEND_FORM_FNS.FAILURE, err)
};
export const codeSignatureDoc = {
	request: (req) => createAction(CODE_SIGNATURE_DOC.REQUEST, req),
	success: (res) => createAction(CODE_SIGNATURE_DOC.SUCCESS, res),
	failure: (err) => createAction(CODE_SIGNATURE_DOC.FAILURE, err)
};
export const signatureDoc = {
	request: (req) => createAction(SIGNATURE_DOC.REQUEST, req),
	success: (res) => createAction(SIGNATURE_DOC.SUCCESS, res),
	failure: (err) => createAction(SIGNATURE_DOC.FAILURE, err)
};
export const installPosLinkToken = {
	request: (req) => createAction(INSTALL_LINK_TOKEN.REQUEST, req),
	success: (res) => createAction(INSTALL_LINK_TOKEN.SUCCESS, res),
	failure: (err) => createAction(INSTALL_LINK_TOKEN.FAILURE, err)
};