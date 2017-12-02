import {reduxForm as _reduxForm, focus} from 'redux-form/immutable'
import React from 'react';
import logger from 'infrastructure/utils/logger'

const focusOnFailed = (errors, form, dispatch) => {
	if (errors) {
		const firstField = Object.keys(errors)[0];
		firstField && dispatch(focus(form, firstField));
	}
};

export const reduxForm = ({form, onSubmitFail:initialSubmitFailed, ...initialProps}) => (Component) => {
	const FormComponent = _reduxForm({form, ...initialProps})(Component);
	class ReduxForm extends React.Component {
		handleSubmitFailed(errors, dispatch, submitError, ...other) {
			const {onSubmitFail:propsSubmitFailed}=this.props;
			focusOnFailed(errors, form, dispatch);
			propsSubmitFailed && propsSubmitFailed(errors, dispatch, ...other);
			initialSubmitFailed && initialSubmitFailed(errors, dispatch, ...other);
			if (!propsSubmitFailed && !initialSubmitFailed)
				logger.warn(submitError)
		}

		render() {
			const {onSubmitFail, ...otherProps}=this.props;
			return <FormComponent onSubmitFail={::this.handleSubmitFailed} {...otherProps}/>;
		}
	}

	return ReduxForm;
};