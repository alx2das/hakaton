import React from 'react';
import {reduxForm} from 'common/formElements';
import {InputField} from 'common/formElements/fields';
import {validPassword, validPasswordLength} from 'common/validators';
import PropTypes from 'prop-types';

const isValidRepeatPassword = text => (value, allValues) => {
	const password = (allValues || {}).get('newPassword');
	if (password && value != password)
		return text;
	return undefined;
};
const isValidPassword = text => (value) => {
	return !validPassword(value) ? text : undefined;
};

const isValidPasswordLength = text => (value) => {
	return !validPasswordLength(value) ? text : undefined;
};

const ChangePasswordComponent = props => {
	const {handleSubmit, onChangePassword, formState:{loading, success, error}}= props;

	{/*const getError = (error) => {*/}
		{/*if (!error) {*/}
			{/*return '';*/}
		{/*}*/}
		{/*if (error.status == 401 ||*/}
	// 		(error.data && error.data.message == "Current password didn't match")) {
	// 		return 'Неверный пароль!';
	// 	}
	// 	return 'Произошла неизвестная ошибка.'
	// };

	return (
		<form onSubmit={handleSubmit(onChangePassword)}>

			<div class="form_group form_horizontal">
				<div class="property_label col">Текущий пароль</div>
				<div class="property_value col">
					<InputField name="oldPassword"
								type="password"
								required="Укажите текущий пароль"/>
				</div>
			</div>

			<div class="form_group form_horizontal">
				<div class="property_label col">Новый пароль</div>
				<div class="property_value col">
					<InputField name="newPassword"
								type="password"
								validate={[
									isValidPasswordLength('Минимальная длина пароля – 8 символов'),
									isValidPassword('Пароль должен содержать заглавные и строчные<br/>буквы латинского алфавита, цифры и знаки<br/>!?.,@#$^&*()_+<>"№%:;()_+[]{}'),
								]}
								required="Укажите новый пароль"/>
				</div>
			</div>

			<div class="form_group form_horizontal">
				<div class="property_label col">Повторите пароль</div>
				<div class="property_value col">
					<InputField name="newSecondPassword"
								type="password"
								validate={[
									isValidPasswordLength('Минимальная длина пароля – 8 символов'),
									isValidPassword('Пароль должен содержать заглавные и строчные<br/>буквы латинского алфавита, цифры и знаки<br/>!?.,@#$^&*()_+<>"№%:;()_+[]{}'),
									isValidRepeatPassword('Пароли не совпадают'),
								]}
								required="Укажите новый пароль"/>
				</div>
			</div>

			{/*<div className="form_error">{getError(error)}</div>*/}
			<div class="form_buttons  row">
				<div class="property_label col">&nbsp;</div>
				<div class="property_value col">
					<button disabled={loading} className="button  middle" type="submit">Изменить пароль</button>
				</div>
			</div>
		</form>
	)
};

ChangePasswordComponent.propTypes = {
	formState: PropTypes.shape({
		loading: PropTypes.bool.isRequired,
		success: PropTypes.bool,
		errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	}).isRequired,
	onChangePassword: PropTypes.func.isRequired
};

export default  reduxForm({
	form: 'change_password'

})(ChangePasswordComponent);

