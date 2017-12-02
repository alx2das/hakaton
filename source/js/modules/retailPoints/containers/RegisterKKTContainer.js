import React, {PropTypes} from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJs from 'components/HOC/toJs'
import {LoaderPanel} from 'common/uiElements'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC'

// компоненты для логики контейнера
import HeaderNav from '../components/RegisterKKT/HeaderNav'
import SignatureDoc from '../components/RegisterKKT/SignatureDoc'
import RegisterForm from '../components/RegisterKKT/RegisterForm'
import {
	SelectOFD,
	LoadingStatementFNS,
	SendReportFNS,
	ErrorKassaConnect,
	SuccessTransferOFD,
	SuccessTransferFNS,
	SuccessReportSent,
	InfoTheEndRegister,
	ErrorCreateReport
} from '../components/RegisterKKT/InfoBox'

// данные для контейра
import * as selector from '../selectors/registerKKTSelectors'
import * as actions from '../actions/registerKKTActions'
import * as enums from '../enums/registerKKTEnums'


function mapStateToProps(state, ownProps) {
	const retailPointID = ownProps.match.params.id;
	const rootState = selector.getRegisterKKTState(state);
	const pointState = rootState.get(retailPointID) || rootState.get('defRetailPoint');

	return {retailPointID, pointState};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			actUpdateLayer: actions.updateLayer,
			actSendFormFNS: actions.sendFormFNS.request,
			actOpenRegKKT: actions.openRegKKT.request,
			actSendReport: actions.sendReport,
			actCodeSignatureDoc: actions.codeSignatureDoc.request,
			actSignatureDoc: actions.signatureDoc.request,
			actCloseRegisterKKT: actions.closeRegisterKKT
		}, dispatch)
	}
}

@retailPointHOC
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJs
export default class RegisterKKTContainer extends DefaultLayerLayout {

	componentWillMount() {
		const {pointState, actOpenRegKKT, retailPointID} = this.props;
		if (!pointState.isCheck) {
			actOpenRegKKT({retailPointID, isPush: true});
		}
	}

	componentDidUpdate() {
		const {pointState: {closeLayer = false}} = this.props;
		if (closeLayer) this.closeLayer();
	}

	componentWillUnmount() {
		const {actCloseRegisterKKT, retailPointID} = this.props;
		actCloseRegisterKKT({retailPointID});
	}

	// отправить заявку на регистрацию
	onSubmitFormRegKKT(props, close) {
		const {retailPointID, actSendFormFNS, pointState} = this.props;
		const form = {
			retailPointTypes: props.get('retailPointTypes'),
			secondaryTaxMode: props.get('twoTaxMode') ? props.get('secondaryTaxMode') : null,
			responsiblePerson: props.get('responsiblePerson'),
			kktFnsCode: props.get('kktFnsCode'),
			ofdPinCode: props.get('ofdPinCode'),
			kktAddress: props.get('kktAddress'),				// не может быть, обязательное поле
			kktMode: props.get('kktMode'), 						// приходит { SERVICES_ONLY: true, ... }
			kktPlace: props.get('kktPlace'),
			taxMode: props.get('taxMode'),
			fnsCode: props.get('fnsCode'),
			pointName: pointState && pointState.requestData && pointState.requestData.pointName || ''
		};

		if (close === true) {
			actSendFormFNS({retailPointID, form});
			this.closeLayer();
		} else {
			actSendFormFNS({retailPointID, form, process: true});
		}
	}

	// отправить отчет о регистрации в ФНС
	onSendReportFNS() {
		const {retailPointID, actSendReport} = this.props;
		actSendReport({retailPointID});
	}

	// запросить код для подписи
	onCodeSignatureDoc() {
		const {actCodeSignatureDoc, retailPointID} = this.props;
		actCodeSignatureDoc({retailPointID});
	}

	// подпись документа (на 2 и на 3 шаге)
	onSignatureDoc(props) {
		const {actSignatureDoc, retailPointID} = this.props;
		actSignatureDoc({
			retailPointID,
			password: props.get('passwordSMS')
		});
	}

	render() {
		const {retailPointID, pointState} = this.props;
		let {step, globalLoading, loading, loadingMessage, requestData} = this.props.pointState;

		// Выбор слоя для отображения
		let ShowSelectComponent = <LoaderPanel loading={globalLoading}/>;
		switch (pointState.showLayer) {

			// Заявление на регистрацию кассы
			case ('registerFormOFD'):
				ShowSelectComponent = (
					<RegisterForm
						initialValues={requestData}
						onSubmitForm={::this.onSubmitFormRegKKT}
					/>
				);
				break;

			// происходит загрузка
			case ('loadingLayer'):
				ShowSelectComponent = (
					<LoadingStatementFNS
						message={loadingMessage || 'Загрузка'}
					/>
				);
				break;

			// Ожидание подписи отчета
			case ('signatureDoc'):
				const title = step === 2
					? 'Подпишите заявление на регистрацию'
					: 'Подпишите отчет о регистрации';
				const onBackFn = step === 2 && (
					pointState.serverStatus === enums.SERVER_STATUS.NOT_EXISTS ||
					pointState.serverStatus === enums.SERVER_STATUS.DRAFT ||
					pointState.serverStatus === enums.SERVER_STATUS.OFD_WAIT_DECL_SIGN
				) ? () => this.props.actUpdateLayer(retailPointID, 'registerFormOFD') : false;
				ShowSelectComponent = (
					<SignatureDoc
						title={title}
						phoneNumber={pointState.phone}
						loading={loading}
						submitLoading={pointState.submitLoading || false}
						onSend={::this.onSignatureDoc}
						onRepeat={::this.onCodeSignatureDoc}
						onBack={onBackFn}
					/>
				);
				break;

			// Ожидание ответа от ИРУД или ФНС
			case ('successTransferOFD'):
				ShowSelectComponent = (
					<SuccessTransferOFD
						email={pointState.email}
					/>
				);
				break;

			// отправить Отчет о регистрации
			case ('ofdWaitReport'):
				ShowSelectComponent = (
					<SendReportFNS
						onSendReport={::this.onSendReportFNS}
						onCloseLayout={::this.closeLayer}
					/>
				);
				break;

			// Отчет о регистрации отправлен в ФНС
			case ('successReportSent'):
				ShowSelectComponent = (
					<SuccessReportSent
						email={pointState.email}
						phone={pointState.phone}
					/>
				);
				break;

			// Ошибка. Не удалось сформировать отчет о регистрации
			case ('reportPrintError'):
				ShowSelectComponent = (
					<ErrorCreateReport
						repeatConnect={::this.onSendReportFNS}
					/>
				);
				break;

			// Не удалось установить связь с кассой
			case ('errorKassaConnect'):
				ShowSelectComponent = (
					<ErrorKassaConnect
						repeatConnect={::this.onSendReportFNS}
					/>
				);
				break;

			// Ожидание ответа ФНС
			case ('SuccessTransferFNS'):
				ShowSelectComponent = (
					<SuccessTransferFNS
						email={pointState.email}
						phone={pointState.phone}
					/>
				);
				break;

			// Регистрация завершина
			case ('registerError'):
				ShowSelectComponent = (
					<InfoTheEndRegister
						email={pointState.email}
						onClose={::this.closeLayer}
					/>
				);
				break;

			// Регистрация завершина
			case ('registerEND'):
				ShowSelectComponent = (
					<InfoTheEndRegister
						email={pointState.email}
						onClose={::this.closeLayer}
					/>
				);
				break;
		}

		return (
			<article className='page page_with_wizard page_with_wizard__kkt' {...this.layerOptions}>
				{!globalLoading &&
				<div className='page_header'>
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>Постановка кассы на учет</h1>
					<HeaderNav step={step}/>
				</div>}

				{ShowSelectComponent}
			</article>
		)
	}

}