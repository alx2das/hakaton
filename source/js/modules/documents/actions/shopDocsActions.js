import {createAction} from 'infrastructure/helpers/actionHelpers'

import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

export const GET_DOCUMENTS = createRequestTypes('DOCUMENTS/ISHOP/GET_DOCUMENTS');
export const GET_DOCUMENT_DETAILS = createRequestTypes('DOCUMENTS/ISHOP/GET_DOCUMENT_DETAILS');
export const SET_FILTER = 'DOCUMENTS/ISHOP/SET_FILTER';
export const SEARCH_DOCUMENTS = 'DOCUMENTS/ISHOP/SEARCH_DOCUMENTS';
export const CORRECT_FILTER = 'DOCUMENTS/ISHOP/CORRECT_FILTER';
export const RESEND_DOCUMENT = createRequestTypes('DOCUMENTS/ISHOP/RESEND_DOCUMENT');

/**
 * Получение списка заказов
 */
export const getDocuments = {
	request: () => createAction(GET_DOCUMENTS.REQUEST),
	success: ({pos, totalCount, documents}) => createAction(GET_DOCUMENTS.SUCCESS, {
		pos,
		totalCount,
		documents
	}),
	failure: ({error}) => createAction(GET_DOCUMENTS.FAILURE, {error})
};
export const setFilter = ({filter}) => createAction(SET_FILTER, {filter});
export const searchDocuments = () => createAction(SEARCH_DOCUMENTS);
export const correctFilter = ({pos}) => createAction(CORRECT_FILTER, {pos});
export const getDocumentDetails = {
	request: ({id, point}) => createAction(GET_DOCUMENT_DETAILS.REQUEST, {id, point}),
	success: ({document}) => createAction(GET_DOCUMENT_DETAILS.SUCCESS, {document}),
	failure: ({id, error}) => createAction(GET_DOCUMENT_DETAILS.FAILURE, {id, error})
};
export const reSendDocument = {
	request: ({id, point}) => createAction(RESEND_DOCUMENT.REQUEST, {id, point}),
	success: ({id}) => createAction(RESEND_DOCUMENT.SUCCESS, {id}),
	failure: ({id, error}) => createAction(RESEND_DOCUMENT.FAILURE, {id, error})
};