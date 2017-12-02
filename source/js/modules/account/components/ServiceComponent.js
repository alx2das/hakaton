import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'common/formElements'
import PropTypes from 'prop-types'
import {LoaderPanel, PrimaryButton, ConfirmPopupService} from 'common/uiElements'
import {InputField} from 'common/formElements/fields'
import ReactTooltip from 'react-tooltip'

const isValidateLogin = val => /^[a-zA-ZА-Яа-я0-9.!#$%&'*+\/=?^_`{|}~-]+@.+$/ig.test(val);
const validateLogin = (text) => (val) => !isValidateLogin(val) ? text : undefined;

class ServiceComponent extends React.Component {

	componentDidUpdate() {
		// подтверждение интеграции после проверки логина/пароля
		const {onSaveIntegration, onClearForm, formState: {checked}} = this.props;

		if (checked) {
			this.removePopup.open()
				.then(onSaveIntegration)
				.catch(onClearForm);
		}
	}

	renderError() {
		const {formState: {msLogin, getStateErrors, connectErrors, disableErrors}} = this.props;
		let errorText = '';

		if (getStateErrors) {
			errorText = 'Ошибка при получении состояния интеграции';
		}
		else if (connectErrors) {
			errorText = connectErrors.status === 409
				? `Аккаунт МойСклад ${msLogin} уже используется другим пользователем МодульКасс`
				: 'Не удалось установить соединение';
		}
		else if (disableErrors) {
			errorText = 'Ошибка при выполнении операции';
		}

		if (errorText)
			return (<div className="info_error">{errorText}</div>);
		return null;
	}

	render() {
		const {
			handleSubmit,
			formState: {loading, stateIntegration, actionIntegration, success},
			onSubmitForm, onCheckIntegration,
			validateIntegration
		} = this.props;
		const registrationIsNotCompleted = validateIntegration();
		return (
			<div className="tab_sevices">
				<LoaderPanel loading={loading}>

					<form onSubmit={handleSubmit(onSubmitForm)}>
						<div className="form_group form_horizontal">
							<input name="stateIntegration"
								   type="checkbox"
								   id="id_stateIntegration"
								   checked={stateIntegration}
								   onChange={onCheckIntegration}/>
							<label tabIndex="-1" htmlFor="id_stateIntegration" className="label_check switcher small" data-for="integrationError" data-tip="">
								<i className="icon"/>
								<span>Интеграция с МойСклад</span>
							</label>
							<ReactTooltip multiline
										  id="integrationError"
										  event="click"
										  eventOff="blur"
										  type="error"
										  place="top"
										  offset={{left: -50}}
										  effect="solid">
								{registrationIsNotCompleted.length > 0 && <span>Для включения интеграции с системой МойСклад<br/>завершите регистрацию кассы в налоговой<br/>для точки продаж "{registrationIsNotCompleted[0].name}"</span>}
							</ReactTooltip>
						</div>

						{stateIntegration &&
						<div className="light_block">
							<div className="form_group form_horizontal">
								<div className="property_label col">Логин</div>
								<div className="property_value col">
									<InputField name="msLogin"
												required="Укажите логин"
												validate={[validateLogin('Неверный логин')]}/>
								</div>
							</div>

							<div className="form_group form_horizontal">
								<div className="property_label col">Пароль</div>
								<div className="property_value col">
									<InputField name="msPassword"
												type="password"
												required="Укажите пароль"/>
								</div>
							</div>
						</div>}

						{this.renderError()}

						{success && <div className="info">Настройки сохранены</div>}

						{stateIntegration &&
						<div className="form_buttons row">
							<PrimaryButton type="submit">Проверить и сохранить</PrimaryButton>
						</div>}

						<ConfirmPopupService
							ref={e => this.removePopup = e}
							title="Вы хотите подтвердить операцию?"
							text="При интеграции с сервисом МойСклад, созданная структура торговых точек в Личном кабинете будет заменена на структуру МойСклад"
							cancelName="Отмена"/>
					</form>

				</LoaderPanel>
			</div>
		);
	}

}

ServiceComponent.propTypes = {
	formState: PropTypes.shape({
		loading: PropTypes.bool,
		save: PropTypes.bool,
		stateIntegration: PropTypes.bool,
		success: PropTypes.bool,
		error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		msLogin: PropTypes.string,
		msPassword: PropTypes.string
	}).isRequired,
	onSubmitForm: PropTypes.func.isRequired,
	onCheckIntegration: PropTypes.func.isRequired
};

ServiceComponent = reduxForm({
	form: 'settingService',
	enableReinitialize: true
})(ServiceComponent);

ServiceComponent = connect((state, props) => ({
	initialValues: props.formState
}))(ServiceComponent);


export default ServiceComponent;