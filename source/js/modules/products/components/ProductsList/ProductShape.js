/**
 * Created by RobertSabiryanov on 18.05.17.
 */
import PropTypes from 'prop-types';
const {shape, number, string} = PropTypes;

export default shape({
	name: string.isRequired,
	inventCode: string.isRequired,
	price: number
})
