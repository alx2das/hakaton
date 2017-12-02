import PropTypes from 'prop-types'

export default PropTypes.shape({
	id: PropTypes.string,
	checkoutDateTime: PropTypes.instanceOf(Date),
	docType: PropTypes.string,
	docNum: PropTypes.string.isRequired,
	docSum: PropTypes.number,
	currentState: PropTypes.string
});