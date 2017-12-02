import PropTypes from 'prop-types';
const {shape, string, arrayOf, bool} = PropTypes;

export default shape({
	name: PropTypes.string,
	barcode: PropTypes.string,
	row: PropTypes.number.isRequired,
	col: PropTypes.number.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	color: PropTypes.string
})
