/**
 * Created by RobertSabiryanov on 17.07.17.
 */
const productActions = jest.genMockFromModule('modules/products/actions/productActions');
productActions.saveModifier = function () {
	return {type: 'PRODUCTS.SAVE_MODIFIER'};
}
module.exports = productActions;