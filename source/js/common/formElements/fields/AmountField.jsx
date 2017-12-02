import React from 'react';
import {Field} from 'redux-form/immutable';
import AmountRender from '../AmountRender'
import {parseNumber} from '../../helpers/numberHelper';
import inputFieldShape from './inputFieldShape';
import {getRequiredValidator} from '../validationHelpers/formFieldHelpers'
import {validator, isValidNumber} from '../../validators'

const AmountField = ({required, requiredDisable, validate = [], invalidAmountError, ...props}) => {
    const validNumber = validator(invalidAmountError || 'Введите корректное значение', isValidNumber);
    const validators = [...getRequiredValidator({required, requiredDisable}), validNumber, ...validate];
    return (<Field type="text" parse={parseNumber}
                   component={AmountRender}
                   validate={validators}
                   {...props}/>)
};

AmountField.propTypes = inputFieldShape;

export default AmountField;