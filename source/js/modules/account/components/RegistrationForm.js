import React from 'react';
import {reduxForm} from 'common/formElements';
import {InputField, PhoneField, Field} from 'common/formElements/fields';
import {
	validEmail, validPassword, validPasswordLength,
	onlyCyr, firstSymbolCyr, validator
} from 'common/validators'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Recaptcha} from 'common/uiElements';
import config from 'common/helpers/clientConfig'


class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);
		this.showCaptcha = config.SHOW_CAPTCHA;
	}

	componentWillReceiveProps(props) {
		if (props.errors && !this.props.errors) {
			this.rec && this.rec.reset();
			this.props.onCaptchaChange(null);
		}
	}

	openAgreement(event) {
		this.props.onOpenAgreement();
		event.preventDefault();
	}

	render() {
		const {
			handleSubmit, loading, onRegister, onCaptchaChange, onCaptchaLoad,
			errors, regData, captchaReady, captcha, agreementSelected
		} = this.props;
		let existEmail = false;
		let defaultErrorText = '';

		const parseError = (error) => {
			if (!error)
				return '';
			const data = error.data || {};
			if (error.status == 401) {
				defaultErrorText = 'Неверный E-mail или пароль!';
			} else if (data.message == "object-already-exists") {
				existEmail = true;
			}
			else if (error.status == 400) {
				switch (data.type) {
					case 'exist':
						existEmail = true;
						break;
					default:
						defaultErrorText = 'Убедитесь что вы заполнили все поля верно';
						return;
				}
			} else {
				defaultErrorText = 'Произошла неизвестная ошибка.';
			}
		};

		parseError(errors);

		const isEnableRegistration = !loading && agreementSelected && captchaReady && captcha;

		return (
			<form onSubmit={handleSubmit(onRegister)} noValidate={true} autoComplete={false}>
				<div class="login_title">Регистрация компании</div>
				<div className="login_content">

					<div class="form_group">
						<div class="input_group_title w100">
							<InputField name="company"
										class="w100"
										tipPlace="bottom"
										required="Укажите название компании"/>
							<div class="input_title">Название компании</div>
						</div>
					</div>

					<div class="row">
						<div class="col half">
							<div class="form_group">
								<div class="input_group_title w100">
									<InputField name="name"
												class="w100"
												tipPlace="bottom"
												validate={[validator('Имя должно начинаться с буквы на кириллице', firstSymbolCyr),
													validator('Имя может содержать только буквы на кириллице, пробел или дефис', onlyCyr)]}
												required="Укажите имя"/>
									<div class="input_title">Имя владельца</div>
								</div>
							</div>
						</div>
						<div class="col half">
							<div class="form_group">
								<div class="input_group_title w100">
									<InputField name="surname"
												class="w100"
												tipPlace="bottom"
												validate={[validator('Фамилия должна начинаться с буквы на кириллице', firstSymbolCyr),
													validator('Фамилия может содержать только буквы на кириллице, пробел или дефис', onlyCyr)]}
												required="Укажите фамилию"/>
									<div class="input_title">Фамилия</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col half">
							<div class="form_group">
								<div class="input_group_title w100">
									<div class="input_group w100">
										<div class="input_group_addon addon_code">+7</div>
										<PhoneField name="phone"
													className='w100'
													tipPlace="bottom"
													required="Укажите номер мобильного телефона"/>
									</div>
									<div class="input_title">Телефон</div>
								</div>
							</div>
						</div>
						<div class="col half">
							<div class="form_group">
								<div class="input_group_title w100">
									<InputField name="email" class="w100"
												tipPlace="bottom"
												validate={[validator('Укажите корректную электронную почту', validEmail)]}
												required="Укажите электронную почту"/>
									<div class="input_title">Электронная почта</div>
								</div>
							</div>
						</div>
					</div>

					<div class="form_group">
						<div class="input_group_title w100">
							<InputField name="password"
										autoComplete="off"
										required="Укажите пароль"
										tipPlace="bottom"
										validate={[
											validator('Минимальная длина пароля – 8 символов', validPasswordLength),
											validator('Пароль должен содержать заглавные и строчные<br/>буквы латинского алфавита, цифры и знаки<br/>!?.,@#$^&*()_+<>"№%:;()_+[]{}', validPassword)
										]}
										class="w100"/>
							<div class="input_title">Придумайте пароль для входа, не менее 8 символов</div>
						</div>
					</div>

					{this.showCaptcha &&
					<div class="form_group_flex">
						<Recaptcha
							ref={r => this.rec = r}
							sitekey={config.RECAPTCHA_KEY}
							render="explicit"
							verifyCallback={onCaptchaChange}
							expiredCallback={onCaptchaChange}
							onloadCallback={onCaptchaLoad}/>
					</div>}

					<div class="form_group">
						<div class="input_group_title w100">
							<Field id="agreement" name="agreement" type="checkbox" component="input"/>
							<label for="agreement" className="label_check f_small">
								<i className="icon"></i>
								<span>Предоставляю ООО «Аванпост» согласие на <a onClick={::this.openAgreement}>обработку персональных данных</a></span>
							</label>
						</div>
					</div>


					{defaultErrorText && <div className="form_error">{defaultErrorText}</div>}

					{!regData && <div class="form_buttons">
						<button disabled={!isEnableRegistration} className="button" type="submit">
							Зарегистрироваться
						</button>
					</div>
					}

					{existEmail && <div class="info_error info_error_icon">
						Пользователь с таким email уже зарегистрирован в системе. Вы можете <Link
						to="/signin">войти</Link>&nbsp;в систему или <Link to="/forgot">восстановить</Link> пароль
					</div>}

					{regData && <div class="info_success info_icon_success">
						Мы отправили письмо на указанную электронную почту. Для того, чтобы завершить регистрацию,
						перейдите
						по ссылке в письме. Ссылка будет работать 24 часа
					</div>}
				</div>
			</form>
		)
	};
}

RegistrationForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	captchaReady: PropTypes.bool.isRequired,
	onRegister: PropTypes.func.isRequired,
	onCaptchaChange: PropTypes.func.isRequired,
	onCaptchaLoad: PropTypes.func.isRequired,
	onOpenAgreement: PropTypes.func.isRequired,
	regData: PropTypes.bool,
	agreementSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default  reduxForm({
	form: 'register'
})(RegistrationForm);

