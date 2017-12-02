import PropTypes from 'prop-types'
import {MEASURE_OPTIONS, VAT_TAG_OPTIONS} from 'modules/core/productEnums'

export default PropTypes.shape({
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	measure: PropTypes.oneOf(MEASURE_OPTIONS.map(s => s.value)),
	vatTag: PropTypes.oneOf(VAT_TAG_OPTIONS.map(s => s.value)),
	price: PropTypes.number.isRequired,
	baseSum: PropTypes.number,
	posSum: PropTypes.number,
	quantity: PropTypes.number.isRequired,
	description: PropTypes.string
});