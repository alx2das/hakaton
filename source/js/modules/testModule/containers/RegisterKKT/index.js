import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJs from 'components/HOC/toJs'
import {reduxForm} from 'common/formElements'
import {formValueSelector} from 'redux-form/immutable'
import {InputField, SelectField} from 'common/formElements/fields'
import {PrimaryButton} from 'common/uiElements'

import * as enums from 'modules/retailPoints/enums/registerKKTEnums'
import * as actions from '../../actions/registerKKTActions'
import * as selectors from '../../selectors/registerKKTSelectors'


function mapStateToProps(state) {
	const regState = selectors.getRegisterKKTState(state);

	return {regState}
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			actUpdateStatus: actions.updateStatus.request
		}, dispatch)
	}
}

@connect(mapStateToProps, mapDispatchToProps)
@toJs
export default class RegisterKKT extends Component {
	onSubmitForm(props) {
		const retailPointID = props.get('retailPointID');
		const data = props.toJS();

		this.props.actUpdateStatus({...data, retailPointID});
	}

	render() {
		const {regState} = this.props;
		return (
			<div className="h100per">
				<div className="title_panel">
					<h1>Настройка статусов KKT</h1>
				</div>

				<TestRegisterKKTForm
					formState={regState}
					initialValues={regState}
					onSubmitForm={::this.onSubmitForm}/>
			</div>
		)
	}
}


/** ---------- Form Test RegisterKKT ---------- **/

const nameForm = 'testRegisterKKTForm';
const selectorFrom = formValueSelector(nameForm);

function mapStateToPropsFrom(state, props) {
	const retailPointID = selectorFrom(state, 'retailPointID');
	const isDisabledBtn = !(retailPointID && retailPointID.length);

	return {isDisabledBtn, initialValues: props.formState}
}

@reduxForm({form: nameForm, enableReinitialize: true})
@connect(mapStateToPropsFrom)
class TestRegisterKKTForm extends Component {

	getKassaStatus() {
		return Object.keys(enums.KASSA_STATUS).map(i => ({
			value: enums.KASSA_STATUS[i],
			label: `[${enums.KASSA_STATUS[i]}] ${enums.KASSA_STATUS_VALUE[enums.KASSA_STATUS[i]]}`
		}))
	}

	getServerStatus() {
		return Object.keys(enums.SERVER_STATUS).map(i => ({
			value: enums.SERVER_STATUS[i],
			label: `[${enums.SERVER_STATUS[i]}] ${enums.SERVER_STATUS_VALUE[enums.SERVER_STATUS[i]]}`
		}))
	}

	render() {
		const {handleSubmit, onSubmitForm, isDisabledBtn, formState: {loading}} = this.props;

		return (
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<div className='option'>
					<div className='description'>
						Данные настройки должны быть установленны с самой кассы
						либо устанавливаются сервером в зависимости от бизнесс-логики
					</div>
				</div>

				<div className='light_block kkt_info' style={{width: 'auto'}}>
					<div className='input_group_title'>
						<div className="title">Торговая точка</div>
						<InputField name='retailPointID'
									className='small w100'
									tipPlace='top'
									required="Укажите ID торговой точки"/>
						<div className="description">Укажите ID торговой точки</div>
					</div>

					<div className='input_group_title'>
						<div className="title">Статус Кассы</div>
						<SelectField name='kktStatus'
									 className='small w100'
									 options={this.getKassaStatus()}/>
						<div className="description">Установите статус кассы</div>
					</div>

					<div className='input_group_title'>
						<div className="title">Статус Сервера</div>
						<SelectField name='registrationRequestStatus'
									 className='small w100'
									 options={this.getServerStatus()}/>
						<div className="description">Установите статус кассы</div>
					</div>

					<div>
						<h2>Другие параметры кассы:</h2>
						<div className='light_block kkt_info' style={{width: 'auto', margin: '5px 0 15px'}}>
							<div className='input_group_title'>
								<div className="title">platform</div>
								<InputField name='kkmInfo.platform' className='small w100'/>
							</div>

							<div className='input_group_title'>
								<div className="title">modelId</div>
								<InputField name='kkmInfo.modelId' className='small w100'/>
							</div>

							<div className='input_group_title'>
								<div className="title">modelName</div>
								<InputField name='kkmInfo.modelName' className='small w100'/>
							</div>

							<div className='input_group_title'>
								<div className="title">vendorId</div>
								<InputField name='kkmInfo.vendorId' className='small w100'/>
							</div>

							<div className='input_group_title'>
								<div className="title">vendorName</div>
								<InputField name='kkmInfo.vendorName' className='small w100'/>
							</div>

							<div className='input_group_title'>
								<div className="title">serialNo</div>
								<InputField name='kkmInfo.serialNo' className='small w100'/>
							</div>

							<div className='input_group_title'>
								<div className="title">fnNo</div>
								<InputField name='kkmInfo.fnNo' className='small w100'/>
							</div>
						</div>
					</div>

					<div className='form_buttons'>
						<PrimaryButton disabled={isDisabledBtn}
									   loading={loading}
									   type="submit">Установить и получить</PrimaryButton>
					</div>
				</div>
			</form>
		)
	}
}