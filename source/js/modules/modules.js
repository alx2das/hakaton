import * as Contragents1 from './contragents/contragentsModule'
import * as ProductsModule1 from './products/productsModule'
import * as CashboxModule1 from './cashbox'
import * as DocumentsModule1 from './documents/documentsModule'
import * as DiscountModule1 from './discount/discountModule';
import * as AccountModule from './account/accountModule'
import * as RetailPointsModule from './retailPoints/retailsPointModule'
import * as CoreModule from './core/coreModule'

export const Contragents = Contragents1;
export const ProductsModule = ProductsModule1;
export const CashboxModule = CashboxModule1;
export const DiscountModule = DiscountModule1;
export const DocumentsModule = DocumentsModule1;

const modules = [
	CoreModule,
	AccountModule,
	RetailPointsModule,
	ProductsModule,
	Contragents,
	DiscountModule,
	DocumentsModule,
	CashboxModule
];

if (__DEV__) {
	const TestSelector = require('./testSelectors');
	const TestModule = require('./testModule');

	modules.push(TestSelector);
	modules.push(TestModule);
}

export default modules;