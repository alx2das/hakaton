import React from 'react';
import {Field} from 'redux-form/immutable';
import PhoneRender from '../PhoneRender'
//import normalizePhone from './normalizePhone'
import inputFieldShape from './inputFieldShape';
import {getRequiredValidator} from '../validationHelpers/formFieldHelpers'
import {validator, isValidPhone, getPlainNumber} from '../../validators'

const phoneParser = (value) => {
    return value.replace(/[^\d]/g, '');
};

class PhoneField extends React.Component {
    static defaultProps = {
        validate: [],
        invalidPhoneError: 'Укажите 10 цифр номера мобильного телефона'
    };

    render() {
        const {required, requiredDisable, validate = [], invalidPhoneError, ...props} =this.props;
        const validPhone = validator(invalidPhoneError, isValidPhone);
        const validators = [...getRequiredValidator({required, requiredDisable}), validPhone, ...validate];

        return ( <Field type="tel" component={PhoneRender}
                        validate={validators}
                        parse={phoneParser} {...props}/>);
    }
}

PhoneField.propTypes = inputFieldShape;

export default PhoneField