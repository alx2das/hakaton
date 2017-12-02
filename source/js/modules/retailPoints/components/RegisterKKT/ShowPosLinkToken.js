import React, {Component, PropTypes} from 'react'


export default class extends Component {
	componentWillReceiveProps (nextProps) {
		if (!nextProps.loading && nextProps.retailPointId && !nextProps.token) {
			this.props.closeLayer();
		}
	}
	render() {
		return (
			<div className="page_content content_padding">
				<div className="center_xy page_center_info page_center_info__pos_inactive">
					<i className="icon" />
					<div className="title">Точка неактивна</div>
					<div className="description">Для активации точки укажите код на кассе</div>
					<div className="code">{this.props.token}</div>
				</div>
			</div>
		)
	}
}
