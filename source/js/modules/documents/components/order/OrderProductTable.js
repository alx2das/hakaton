import React from 'react'
import PropTypes from 'prop-types'
import OrderProductRow from './OrderProductRow'
import ProductShape from './ProductShape'

const OrderProductTable = ({products, canEdit, onRemove, totalSum}) => {

	const hasProducts = products.length > 0;
	return (
		<div class="table  table_docs  table_docs__orders_add">
			<OrderProductRow isHeader={true} canEdit={canEdit}/>
			{products.map(row => <OrderProductRow key={row.id} row={row}
												  canEdit={canEdit}
												  onRemove={() => onRemove(row.id)}/>)}
			{!hasProducts && <div class="table_row ">
				{canEdit && <div class="c_grey36 warning center_xy w100">Список товаров пуст</div>}
				{!canEdit && <div class="c_grey36 center_xy w100">Список пуст</div>}
			</div>
			}
			{hasProducts && <OrderProductRow isFooter={true}
											 total={totalSum}
											 canEdit={canEdit}/>}
		</div>
	)
};

OrderProductTable.propTypes = {
	canEdit: PropTypes.bool,
	products: PropTypes.arrayOf(ProductShape).isRequired,
	onRemove: PropTypes.func,
	totalSum: PropTypes.number
};

export default OrderProductTable;
