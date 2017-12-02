import PropTypes from 'prop-types'
import {MEASURE_OPTIONS, VAT_TAG_OPTIONS} from 'modules/core/productEnums'

export default PropTypes.shape({
	barcode: PropTypes.string,
	name: PropTypes.string.isRequired,
	vatTag: PropTypes.oneOf(VAT_TAG_OPTIONS.map(s => s.value)),
	price: PropTypes.number,
	discSum: PropTypes.number,
	quantity: PropTypes.number.isRequired
});