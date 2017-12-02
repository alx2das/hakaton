import api from 'infrastructure/api/api'
import * as mapper from './discountMapper'

/**
 * Список скидок
 * @url GET /api/v1/retail-point/<token>/catalog/SIMPLE_DISCOUNT?q=&sortField=name&sortDirection=asc
 * @param token
 * @param props
 * @returns {*|axios.Promise}
 */
export const getListDiscount = ({token, ...props}) => {
	return api.v1().retailpoint(token).catalog().simpleDiscount()
		.get(mapper.listDiscount.toServer(props))
		.then((response) => mapper.listDiscount.toClient(response.data));
};

/**
 * Дабавляет/Обновляет скидку
 * @url POST/PUT /api/v1/retail-point/<token>/catalog
 * @param token
 * @param isNew		- bool добавить/обновить
 * @param props
 * @returns {*|axios.Promise}
 */
export const editDiscount = ({token, isNew, ...props}) => {
	const apiUrl = api.v1().retailpoint(token).catalog();
	const mapperData = mapper.editDiscountToServer({isNew, ...props});

	if (isNew) {
		return apiUrl.post(mapperData);
	} else {
		return apiUrl.put(mapperData);
	}
};

/**
 * Удаляет скидку по коду
 * @url DELETE /api/v1/retail-point/<token>/catalog/SIMPLE_DISCOUNT/<code>
 * @param token
 * @param code
 * @returns {*|axios.Promise}
 */
export const deleteDiscount = ({token, code}) => {
	return api.v1().retailpoint(token).catalog().simpleDiscount(code)
		.delete();
};