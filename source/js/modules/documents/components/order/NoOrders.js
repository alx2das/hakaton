import React from 'react'
import PropTypes from 'prop-types'

const NoOrders = ({onAddOrder}) => {
	return (<div class="center_xy  page_center_info  page_center_info__orders0">
		<i class="icon  icon_orders"></i>
		<div class="title">Заказы отсутствуют</div>
		<div class="form_buttons  row">
			<a class="button  small  icon-plus" onClick={onAddOrder}>Добавить заказ</a>
		</div>
	</div>);
};

NoOrders.propTypes = {
	onAddOrder: PropTypes.func.isRequired
};

export default NoOrders;