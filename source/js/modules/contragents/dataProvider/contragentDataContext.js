import api from 'infrastructure/api/api';
import * as mapper from './contragentDataMapper';

/**
 * Список контрагентов
 * GET /api/v1/retail-point/<token>/catalog/CONTRACTOR?q=&sortField=name&sortDirection=asc
 * @param token
 * @param props
 */
export const getListContragent = ({token, ...props}) => {
	return api.v1().retailpoint(token).catalog().contractor()
		.get(mapper.getListContragent.toServer(props))
		.then(response => mapper.getListContragent.toClient(response.data));
};


export const editContragent = ({token, isNew, ...props}) => {
	const apiUrl = api.v1().retailpoint(token).catalog();
	const mapperData = mapper.editContragentToServer({isNew, ...props});

	if (isNew) {
		return apiUrl.post(mapperData);
	} else {
		return apiUrl.put(mapperData);
	}
};

export const deleteContragent = ({token, code}) => {
	return api.v1().retailpoint(token).catalog().contractor(code)
		.delete();
};