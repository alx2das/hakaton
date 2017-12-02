import PropTypes from 'prop-types';
const {shape, string, number, bool} = PropTypes;

export default shape({
	name: string,
	barcode: string,
	qty: number,
	price: number
})
