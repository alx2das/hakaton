import React from 'react';
import {Field} from 'redux-form/immutable';
import TextAreaRender from '../TextAreaRender';
import inputFieldShape from './inputFieldShape';
import {getRequiredValidator} from '../validationHelpers/formFieldHelpers'

const TextAreaField = ({type = 'text', component = TextAreaRender, required, requiredDisable, validate = [], ...props}) => {
	const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];
	return (<Field type={type}
				   validate={validators}
				   component={component}
				   {...props}/>);
};

TextAreaField.propTypes = inputFieldShape;

export default TextAreaField;