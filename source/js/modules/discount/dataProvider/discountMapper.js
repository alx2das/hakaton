import {generateNumber} from 'infrastructure/utils/uuidGenerator';

export const listDiscount = {
	toServer: (props) => {
		let params = {};

		if (props.q) params.q = props.q;
		if (props.sortField) params.sortField = props.sortField;
		if (props.sortDirection) params.sortDirection = props.sortDirection;
		if (props.pos) params.start = props.pos;
		if (props.count) params.count = props.count;

		return params;
	},
	toClient: (response) => ({
		data: response.data.map(item => ({
			typeFrom: item.type,	// тип откуда была добавлена скидка (потом будут варианты)
			code: item.code,
			name: item.name,
			value: item.value + ''
		})),
		pos: response.pos,
		total_count: response.total_count
	})
};

export const editDiscountToServer = ({isNew, ...props}) => ({
	catalogType: 'SIMPLE_DISCOUNT',
	code: isNew ? generateNumber().toString() : props.code,
	name: props.name,
	value: props.value,
	type: props.typeFrom || 'BUTTON',
	valueType: props.valueType || 'PERCENT'
});