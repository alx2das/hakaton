import {uuid} from 'infrastructure/utils/uuidGenerator'

export const getDefault = () => {
	return {
		id: '',
		inventCode: null,
		barcode: null,
		name: '',
		price: null,
		minPrice: null,
		quantity: 1,
		baseSum: 0,
		posSum: 0,
		measure: 'pcs',
		//basePrice: 0,
		description: '',
		//baseGoodPrice: null,
		//baseGoodMinPrice: null,
		vatTag: '0',
		type: "MAIN"
	};
};

export const create = ({inventCode, isNew, barcode, minPrice, name, price, quantity, measure, vatTag, description}) => {
	const inventPosition = getDefault();
	inventPosition.id = uuid();
	inventPosition.inventCode = !isNew ? inventCode : uuid();
	inventPosition.barcode = !isNew ? barcode : null;
	inventPosition.name = name;
	inventPosition.measure = measure;
	//inventPosition.price = inventPosition.basePrice = inventPosition.baseGoodPrice = price;
	//inventPosition.baseGoodMinPrice = minPrice || price;
	inventPosition.price = price;
	inventPosition.minPrice = minPrice;
	inventPosition.quantity = quantity || 1;
	inventPosition.posSum = inventPosition.baseSum = inventPosition.quantity * inventPosition.price;
	inventPosition.vatTag = vatTag;
	inventPosition.description = description;
	return inventPosition;
}