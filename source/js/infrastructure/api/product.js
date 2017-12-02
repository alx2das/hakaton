export default (api) => {
	api.v1().retailpoint().addResource('catalog');
	api.v1().retailpoint().catalog().addResource('inventory','INVENTORY');
	api.v1().retailpoint().catalog().addResource('modifierGroups','MODIFIER_GROUP');
	api.v1().retailpoint().catalog().addResource('simpleDiscount','SIMPLE_DISCOUNT');
	api.v1().retailpoint().catalog().addResource('contractor','CONTRACTOR');
	api.v1().addResource('uploadCatalog', 'upload-catalog');
};
