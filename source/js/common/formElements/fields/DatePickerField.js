import React from 'react'
import PropTypes from 'prop-types'
import {Field} from 'redux-form/immutable'
import {getRequiredValidator} from 'common/formElements/validationHelpers/formFieldHelpers'
import DatePickerRender from '../DatePickerRender'
import dateHelper from 'common/helpers/dateHelper'

const parseDate = date => {
	if (!date)
		return date;
	if (date.replace)
		return dateHelper.parseDate(date, 'd.m.Y');
	return date;
};

const DatePickerField = ({required, requiredDisable, validate = [], ...props}) => {
	const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];
	return <Field type="text" validate={validators}
				  component={DatePickerRender}
				  parse={parseDate}
				  {...props} />
};

DatePickerField.propTypes = {
	wrapperClassName: PropTypes.string,
	tipPlace: PropTypes.string
};


export default DatePickerField;