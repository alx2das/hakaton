import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux';
import {getRetailPointList, getCurrentRetailPointId, getRetailPointListLoading} from '../selectors/retailPointSelectors'
import localStorage from 'core/storage/localStorage'
import { KASSA_STATUS } from '../enums/registerKKTEnums';

const mapState = state => ({
	points: getRetailPointList(state),
	loading: getRetailPointListLoading(state)
});

@connect(mapState)
export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!localStorage.getItem('notificationKKT') && nextProps.points && (nextProps.points.size == 0 || nextProps.points.filter((item) => item.get('kktStatus') != KASSA_STATUS.KKT_NOT_PLUGGED).size == 0)) {
			this.setState({
				show:true
			});
		}
	}
	hide = () => {
		localStorage.setItem('notificationKKT', true);
		this.setState({
			show: false
		});
	};
	render() {
		if (this.state.show) {
			return (
				<div className="popup_overlay">
					<div className="popup_table">
						<div className="popup_cell">
							<div className="popup_layer  w_auto">
								<div className="center_xy  page_center_info  page_center_info__pos_popup">
									<i className="icon"></i>
									<div className="title">Мы упростили регистрацию кассы в налоговой</div>
									<ul className="steps_vertical">
										<li><span>Заключите договор с нашим партнером - Яндекс.ОФД</span></li>
										<li><span>Поставьте кассу на учет через личный кабинет Модулькассы</span></li>
										<li><span>Получайте уведомления об изменении статуса регистрации по смс и на почту</span>
										</li>
									</ul>
									<div className="form_buttons">
										<a onClick={this.hide} className="button  middle  wide">Понятно, спасибо</a>
									</div>
								</div>
							</div>
							<div className="popup_backdrop"></div>
						</div>
					</div>
				</div>
			)
		}
		return null;
	}
}
