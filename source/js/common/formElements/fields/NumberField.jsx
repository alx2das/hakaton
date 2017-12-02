import React from 'react';
import {Field} from 'redux-form/immutable';
import {NumberRender} from 'common/formElements'
import {parseNumber} from '../../helpers/numberHelper';
import {getRequiredValidator} from '../validationHelpers/formFieldHelpers'
import {validator, isValidNumber} from '../../validators'
import PropTypes from 'prop-types';

class NumberField extends React.Component {
    static defaultProps = {
        validate: [],
        component: NumberRender,
        invalidNumberError: 'Введите корректное значение'
    };

    static propTypes = {
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
        float: PropTypes.bool //для значений с запятой
    };

    render() {
        const {required, requiredDisable, validate = [], component = NumberRender, invalidNumberError, ...props} =this.props;

        const validNumber = validator(invalidNumberError, isValidNumber);
        const validators = [...getRequiredValidator({required, requiredDisable}), validNumber, ...validate];
        return ( <Field type="tel"
                        validate={validators}
                        component={component}
                        normalize={parseNumber}
                        {...props}/>)
    }


}

export default NumberField