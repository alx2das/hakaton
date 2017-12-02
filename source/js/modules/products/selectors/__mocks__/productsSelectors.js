/**
 * Created by RobertSabiryanov on 18.07.17.
 */
import {fromJS} from 'immutable';

const productsSelectors = jest.genMockFromModule('modules/products/selectors/productsSelectors');

productsSelectors.getProductDetailSection= ()=>{
	return fromJS({
		productView: {},
		searchProductsResult: {}, //результаты поиска в выпадушке
		searchGroupsResult: {} //результаты поиска группы модификаторов в выпадушке
	})
}
module.exports = productsSelectors;