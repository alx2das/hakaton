import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'common/formElements'
import {InputField} from 'common/formElements/fields'
import {PrimaryButton, RetryTimer} from 'common/uiElements'
import {connect} from 'react-redux'
import {formValueSelector} from 'redux-form/immutable'
import {bindActionCreators} from 'redux'
import {change} from 'redux-form/immutable'


const nameForm = 'signatureDocForm';
const selectorFrom = formValueSelector(nameForm);

function mapStateToProps(state) {
	const pass = selectorFrom(state, 'passwordSMS');
	return {disabledBtn: !(pass && pass.length > 0)}
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({change}, dispatch)
	}
}

@reduxForm({form: nameForm})
@connect(mapStateToProps, mapDispatchToProps)
export default class SignatureDoc extends Component {

	static propTypes = {
		title: PropTypes.string,			// заголовок подписи
		phoneNumber: PropTypes.string,		// номер телефона куда отправленно сообщение
		loading: PropTypes.bool,			// выполнение загрузки
		submitLoading: PropTypes.bool,		// выполнение загрузки
		onRepeat: PropTypes.func,			// функ. повтора пароля
		onSend: PropTypes.func,				// функ. отправки пароля
		onBack: PropTypes.oneOfType([		// функ. вернуться назад или false - не показывать ссылку
			PropTypes.func,
			PropTypes.bool
		])
	};

	static defaultProps = {
		title: 'Подпишите заявление на регистрацию',
		phoneNumber: '89995666969',
		loading: false,
		submitLoading: false
	};

	constructor(props) {
		super(props);
		this.state = {finalTimer: false};
	}

	render() {
		const {
			title, phoneNumber, loading, submitLoading, disabledBtn,
			handleSubmit, onRepeat, onSend, onBack
		} = this.props;

		return (
			<div className='page_content content_padding no_wide_content'>
				<div className='fw_m'>{title}</div>
				<div className='f_small mt12 mb24'>
					Мы отправили вам СМС-сообщение с кодом на номер {phoneNumber}.<br/>
					Введите его в поле ниже и нажмите "Подтвердить"
				</div>

				<form className={`pos ${loading && 'loading_block'}`} onSubmit={handleSubmit(onSend)}>
					<div className='light_block pin-code-sms-confirm'>
						<div className='fw_m  mb12'>Код-смс</div>
						<flex>
							<div className='input_group'>
								<div className='input_group_addon icon-shake-phone'/>
								<InputField name='passwordSMS'
											autoComplete="off"
											disabled={this.state.finalTimer}
											tipPlace='top' required='Введите СМС-код'
											maxLength={6} mштLength={6}/>
							</div>
							<PrimaryButton type='submit'
										   disabled={disabledBtn}
										   loading={submitLoading}
										   className='button middle'>Подтвердить</PrimaryButton>
						</flex>
						{!loading && <RetryTimer maxSecond={120} onRepeat={onRepeat}/>}
					</div>
				</form>

				{onBack && <div className='f_small mt24'>
					<a onClick={onBack}>Вернуться к заявлению</a>
				</div>}
			</div>
		)
	}

}