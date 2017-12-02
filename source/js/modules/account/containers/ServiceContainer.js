import React from 'react'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import {bindActionCreators} from 'redux'

import * as selectors from '../selectors/accountSelectors'
import * as actions from '../actions/serviceActions'
import ServiceComponent from '../components/ServiceComponent'

import { NO_INTEGRATION_MY_SKLAD_STATUS } from '../../retailPoints/enums/registerKKTEnums'
import { getRetailPointList } from '../../retailPoints/selectors/retailPointSelectors'

@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ServiceContainer extends React.Component {

	componentWillMount() {
		this.props.getStateIntegration();
	}

	onSubmitForm(props) {
		this.props.checkSaveIntegration({
			msLogin: props.get('msLogin'),
			msPassword: props.get('msPassword'),
			save: true
		});
	}

	onSaveIntegration() {
		const {checkSaveIntegration, serviceState: {msLogin, msPassword}} = this.props;
		checkSaveIntegration({
			msLogin: msLogin,
			msPassword: msPassword,
			save: false
		});
	}

	onCheckIntegration() {
		const {
			updateStateIntegration, disableIntegration,
			serviceState: {actionIntegration, stateIntegration},
			retailPoints
		} = this.props;

		if (!this.validateIntegration().length) {
			updateStateIntegration(!stateIntegration);

			if (actionIntegration && stateIntegration) {
				disableIntegration();	// отключаем интеграцию
			}
		}
	}

	validateIntegration = () => {
		if (this.props.retailPoints) {
			return this.props.retailPoints.filter((point) => NO_INTEGRATION_MY_SKLAD_STATUS.indexOf(point.registrationRequestStatus) != -1);
		}
		return [];
	};
	onClearForm() {
		this.props.clearFormIntegration();
	}

	render() {
		return <ServiceComponent formState={this.props.serviceState}
								 onSubmitForm={::this.onSubmitForm}
								 onSaveIntegration={::this.onSaveIntegration}
								 onClearForm={::this.onClearForm}
								 onCheckIntegration={::this.onCheckIntegration}
								 validateIntegration={this.validateIntegration}
		/>
	}

}

function mapStateToProps(state) {
	return {
		serviceState: selectors.getServiceSection(state),
		retailPoints: getRetailPointList(state)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			getStateIntegration: actions.getState.request,
			checkSaveIntegration: actions.checkSaveIntegration.request,
			disableIntegration: actions.disableIntegration.request,
			updateStateIntegration: actions.updateState,
			clearFormIntegration: actions.clearForm,
		}, dispatch)
	}
}


export default ServiceContainer;