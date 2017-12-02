import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'
import {InputField, TextAreaField, Field} from 'common/formElements/fields'
import {initialize} from 'redux-form/immutable'

class OrderDetailForm extends React.Component {

	componentDidMount() {
		const {form, dispatch}=this.props;
		dispatch(initialize(form, {
			beginDateTime: new Date(),
			docType: 'SALE',
			status: 'OPENED'
		}, false));
	}

	render() {
		const {handleSubmit, onSave, className, formError} = this.props;

		return (
			<form className={className} onSubmit={handleSubmit(onSave)}>
				<Field name="beginDateTime" component="input" class="hidden"/>
				<Field name="docType" component="input" class="hidden"/>
				<Field name="status" component="input" class="hidden"/>

				<div class="label">Номер заказа</div>
				<div className="order_number">
					<InputField name="docNum"
								required="Введите номер заказа"/>
				</div>
				<div class="order_commentary">
					<InputField label="Комментарий"
								name="description"/>
				</div>
			</form>
		);
	}
}


OrderDetailForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	className: PropTypes.string,
	formError: PropTypes.object
};

OrderDetailForm = reduxForm({
	form: 'orderForm'
})(OrderDetailForm);


export default OrderDetailForm;