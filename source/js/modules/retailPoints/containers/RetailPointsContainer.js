import React from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router'
import {bindActionCreators} from 'redux';
import toJs from 'components/HOC/toJs'
import {LoaderPanel, ContentPopupService} from 'common/uiElements'
import {getRetailPointList, getCurrentRetailPointId, getRetailPointListLoading, getRetailPointErrorPopup} from '../selectors/retailPointSelectors'
import RetailPointList from '../components/RetailPointList/RetailPointList';
import * as retailPointActions from '../actions/retailPointActions';
import * as regKKTActions from '../actions/registerKKTActions'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';

const mapActions = dispatch => ({
	onSelectPoint: bindActionCreators(retailPointActions.setRetailPoint, dispatch),
	push: bindActionCreators(push, dispatch),
	createRetailPoint: bindActionCreators(retailPointActions.createRetailPoint, dispatch),
	getRetailPoints: bindActionCreators(retailPointActions.getRetailPoints.request),
	actOpenRegKKT: bindActionCreators(regKKTActions.openRegKKT.request, dispatch),
	actShowErrorPopup: bindActionCreators(retailPointActions.showErrorPopup, dispatch),
	actSendReport: bindActionCreators(regKKTActions.sendReport, dispatch),
});

const mapState = state => ({
	points: getRetailPointList(state),
	selectedPointId: getCurrentRetailPointId(state),
	loading: getRetailPointListLoading(state),
	errorPopup: getRetailPointErrorPopup(state)
});

@connect(mapState, mapActions)
@toJs
@retailPointHOC
class RetailPointsContainer extends React.Component {

	componentDidUpdate() {
		const {errorPopup, actShowErrorPopup} = this.props;
		if (errorPopup && errorPopup.show) {
			this.removePopup.open().then(() => {
				actShowErrorPopup({show: false});
			});
		}
	}

	openPoint(id) {
		this.props.push({pathname: `/retail-points/edit/${id}`});
	}

	onActionRegKKT(id) {
		this.props.actOpenRegKKT({retailPointID: id});
	}

	render() {
		const {points, selectedPointId, onSelectPoint, createRetailPoint, loading, actSendReport} = this.props;
		return (
			<div>
				<div className="title_panel">
					<h1>Точки продаж</h1>
					<div className="title_actions">
						<button className="button small icon-plus"
								onClick={createRetailPoint}>Добавить точку</button>
					</div>
				</div>
				<LoaderPanel loading={loading}>
					<RetailPointList points={points}
									 selectedPointId={selectedPointId}
									 actSendReport={actSendReport}
									 onSelectPoint={onSelectPoint}
									 onActionRegKKT={::this.onActionRegKKT}
									 onItemClick={::this.openPoint}/>
				</LoaderPanel>

				<ContentPopupService className='popup_reg_kkt' ref={p => this.removePopup = p}>
					<h1>Поставьте кассу на учет через<br />личный кабинет налогоплательщика</h1>
					<div>Ознакомьтесь с инструкцией на сайте МодульКассы</div>
					<div className='popup_panel'>
						<a className='button middle' href='http://modulkassa.ru/help/registratsiya-fns/'
						   onClick={() => this.removePopup.dialog._close()}
						   target='_blank'>Перейти к инструкции</a>
						<a className='button_clean middle' href='https://www.nalog.ru'
						   onClick={() => this.removePopup.dialog._close()}
						   target='_blank'>Кабинет налогоплательщика</a>
					</div>
				</ContentPopupService>
			</div>
		);
	}
}

export default RetailPointsContainer