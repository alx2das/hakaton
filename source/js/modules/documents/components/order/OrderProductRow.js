import React from 'react'
import PropTypes from 'prop-types'
import ProductShape from './ProductShape'
import {AmountFormat, NumberFormat} from 'common/uiElements'
import {getLabelByValue, VAT_TAG_OPTIONS, MEASURE_OPTIONS} from 'modules/core/productEnums'

const OrderProductRow = ({row, onRemove, canEdit, isHeader, isFooter, total}) => {
	if (isHeader) {
		return (<div class="table_head">
			<div class="doc_name">Наименование</div>
			<div class="doc_comment">Комментарий</div>
			<div class="doc_price">Цена</div>
			<div class="doc_сount">Кол-во</div>
			<div class="doc_amount">Сумма</div>
			<div class="doc_nds">НДС</div>
			{canEdit && <div class="doc_delete_icon"></div>}
		</div>);
	}
	else if (isFooter) {
		return (
			<div class="table_row  table_row__total">
				<div class="doc_name"></div>
				<div class="doc_comment"></div>
				<div class="doc_price"></div>
				<div class="doc_сount">Сумма:</div>
				<div class="doc_amount"><AmountFormat value={total}/></div>
				<div class="doc_nds"></div>
				<a className='doc_delete_icon'/>
			</div>
		);
	} else {
		const measureLabel = getLabelByValue(MEASURE_OPTIONS, row.measure);
		const vatTagLabel = getLabelByValue(VAT_TAG_OPTIONS, row.vatTag);
		return (<div class="table_row  row_link">
			<div class="doc_name">{row.name}</div>
			<div class="doc_comment">{row.description}</div>
			<div class="doc_price"><AmountFormat value={row.price}/></div>
			<div class="doc_сount"><NumberFormat value={row.quantity}/>&nbsp;{measureLabel.short}</div>
			<div class="doc_amount"><AmountFormat value={row.posSum}/></div>
			<div class="doc_nds">{vatTagLabel.short}</div>
			{canEdit && <a class="doc_delete_icon  icon-trash-bin" onClick={onRemove}></a>}
		</div>)
	}

};

OrderProductRow.propTypes = {
	row: ProductShape,
	isHeader: PropTypes.bool,
	canEdit: PropTypes.bool,
	isFooter: PropTypes.bool,
	total: PropTypes.number,
	onRemove: PropTypes.func
}

export default OrderProductRow;

