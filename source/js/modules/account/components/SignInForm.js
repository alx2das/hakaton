import React from 'react';
import {reduxForm} from 'common/formElements';
import {InputField} from 'common/formElements/fields';
import {validEmail} from 'common/validators';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
const isValidEmail = (text) => (...args) => !validEmail(...args) ? text : undefined;

const SignInForm = props => {
	const {handleSubmit, loading, onLogin, errors} = props;

	const getError = (error) => {
		if (!error)
			return '';
		if (error.status == 401)
			return 'Неверная электронная почта или пароль!';
		return 'Произошла неизвестная ошибка.'
	};

	return (
		<form onSubmit={handleSubmit(onLogin)}>
			<div className="login_content">
				<div className="login_auth_block">
					<div class="form_group">
						<div class="input_group light w100">
							<InputField name="email"
										label="Почта"
										type="text"
										required="Укажите E-mail"
										hideTips={true}
										validate={[isValidEmail('Укажите корректный E-mail')]}/>
							<div class="input_group_addon icon-mail"></div>
							<div class="input_light_border_bottom"></div>
						</div>
					</div>

					<div class="form_group">
						<div class="input_group light w100">
							<InputField name="password"
										label="Пароль"
										type="password"
										hideTips={true}
										required="Введите пароль"/>
							<div class="input_group_addon icon-password"></div>
							<div class="input_light_border_bottom"></div>
						</div>
					</div>


					{/*Блок ошибок*/}
					<div className="form_error">{getError(errors)}</div>

					<div className="form_buttons">
						{!loading && <button className="button" type="submit">Войти</button>}
						{loading && <button className="button loading_block" type="button"></button>}
					</div>
				</div>
			</div>
			<div className="login_links">
				<Link to="/forgot">Забыли пароль?</Link>
				<Link to="/registration">Зарегистрироваться</Link>
			</div>
		</form>
	)
};

SignInForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	onLogin: PropTypes.func.isRequired,
	redirectUrl: PropTypes.string,
	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default  reduxForm({
	form: 'auth'// имя формы в state (state.form.auth)

})(SignInForm);

