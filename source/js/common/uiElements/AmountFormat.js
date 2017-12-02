import React from 'react'
import PropTypes from 'prop-types'
import {isEmpty} from '../validators'
import accounting from 'accounting';

const CurrencySymbol = ({value}) => {
	if (value == 'RUR')
		return (<span class="cur ruble"><span>р.</span></span>);
	if (value == 'USD')
		return (<span class="cur dollar"><span>$</span></span>);
	if (value == 'EUR')
		return (<span class="cur euro"><span>€</span></span>);
	return null;
};

const AmountFormat = ({value, currency = 'RUR', def = '', className = ''}) => {
	if (isEmpty(value))
		return def ? (<span>{def}</span>) : null;
	const val = parseFloat(cleanValue(value));
	const formatted = !isNaN(val) ? accounting.formatNumber(val, 2, " ") : def;
	return (<span className={className}>{formatted}&nbsp;<CurrencySymbol value={currency}/></span>);
};

function cleanValue(val) {
	return val.replace ? val.replace(/[^0-9\.,]+/g, '').replace(',', '.') : val;
}

AmountFormat.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	currency: PropTypes.oneOf(['RUR', 'USD', 'EUR']),
	def: PropTypes.string,
	className: PropTypes.string
};

export  default AmountFormat;