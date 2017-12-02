import PropTypes from 'prop-types';
const {shape, string, arrayOf, bool, number} = PropTypes;

export default shape({
	name: string,
	code: string,
	order: number
})
