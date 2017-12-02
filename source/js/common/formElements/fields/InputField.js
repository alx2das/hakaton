import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from '../InputRender';
import PropTypes from 'prop-types';
import {getRequiredValidator} from '../validationHelpers/formFieldHelpers'

const InputField = ({type = 'text', component = InputRender, required, requiredDisable, validate = [], warn = [], ...props}) => {
	const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];
	return (<Field type={type}
				   validate={validators}
				   warn={warn}
				   component={component}
				   {...props}/>);
};

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	format: PropTypes.func,
	normalize: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onDragStart: PropTypes.func,
	onDrop: PropTypes.func,
	parse: PropTypes.func,
	required: PropTypes.string, //текст ошибки при отсутствии значения
	requiredDisable: PropTypes.bool, //выключении валидации на обязательность значения
	validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
	wrapperClassName: PropTypes.string, //стили для дива в который будет завернуть компонент при натягивании валидации
	tipPlace: PropTypes.string //где будет выводится тултип
};

export default InputField;