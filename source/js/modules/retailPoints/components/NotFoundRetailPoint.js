import React from 'react';
import PropTypes from 'prop-types'

class NotFoundRetailPoint extends React.Component {

	render() {
		const {onCreateRetailPoint} = this.props;

		return (<div className="h100per">
			<div></div>
			<div class="center_xy  page_center_info  page_center_info__pos0">
				<i class="icon icon-pos"></i>
				<div className="title">У вас еще нет торговых точек</div>
				<div>Для продолжения работы необходимо добавить точку продаж</div>
				<div className="form_buttons">
					<button class="button small icon-plus" onClick={onCreateRetailPoint}>Добавить точку продаж
					</button>
				</div>
			</div>
		</div>);

	}
}

NotFoundRetailPoint.propTypes = {
	onCreateRetailPoint: PropTypes.func.isRequired
};

export default  NotFoundRetailPoint;