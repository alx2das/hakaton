import PropTypes from 'prop-types';
const {shape, string} = PropTypes;

export default shape({
	name: string,
	address: string,
	settings: shape({
		aboutModulPosUrl: string
	}),

})
