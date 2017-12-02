import React from 'react'
import PropTypes from 'prop-types'
import DocPositionShape from './DocPositionShape'
import {AmountFormat} from 'common/uiElements'
import {getLabelByValue, VAT_TAG_OPTIONS} from 'modules/core/productEnums'

const DocPositionRow = ({row, isHeader, isFooter, total}) => {
	if (isHeader) {
		return (<div class="table_head">
			<div class="doc_name">Наименование</div>
			<div class="doc_price">Цена</div>
			<div class="doc_сount">Кол-во</div>
			<div class="doc_amount">Сумма</div>
			<div class="doc_nds">НДС</div>
		</div>);
	}
	else if (isFooter) {
		return (
			<div class="table_row  table_row__total">
				<div class="doc_name"></div>
				<div class="doc_price"></div>
				<div class="doc_сount">Сумма:</div>
				<div class="doc_amount"><AmountFormat value={total}/></div>
				<div class="doc_nds"></div>
			</div>
		);
	} else {
		return (<div class="table_row  row_link">
			<div class="doc_name">{row.name}</div>
			<div class="doc_price"><AmountFormat value={row.price}/></div>
			<div class="doc_сount">{row.quantity}</div>
			<div class="doc_amount"><AmountFormat value={row.sum}/></div>
			<div class="doc_nds">{getLabelByValue(VAT_TAG_OPTIONS, row.vatTag).short}</div>
		</div>)
	}

};

DocPositionRow.propTypes = {
	row: DocPositionShape,
	isHeader: PropTypes.bool,
	isFooter: PropTypes.bool,
	total: PropTypes.number
};

export default DocPositionRow;

