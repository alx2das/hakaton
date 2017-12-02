import React from 'react'
import PropTypes from 'prop-types'

const NoTabs = ({onClickShow}) => {
	return (<div className="center_xy page_center_info page_center_info__orders0">
		<i class="icon  icon_orders" />
		<div className="title">Горячие клавиши не заданы</div>
		<div className="form_buttons row">
			<button className="button small icon-plus"
					onClick={onClickShow}>Добавить горячие клавишы
			</button>
		</div>
	</div>);
};

NoTabs.propTypes = {
	onClickShow: PropTypes.func.isRequired
};

export default NoTabs;