import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'
import {InputField, AmountField} from 'common/formElements/fields'
import {PrimaryButton} from 'common/uiElements'
import {initialize} from 'redux-form/immutable'

const discountValueValidate = (error) => (val) => {
	const v = parseFloat(val);
	return !(v < 0 || v > 100) ? undefined : error;
};


class DiscountEditComponent extends React.Component {
	componentWillMount() {
		const {discount, dispatch, form} = this.props;
		const formState = {...discount};

		dispatch(initialize(form, formState, false));
	}

	render() {
		const {
			handleSubmit,
			isNew, onSubmitForm, onCloseForm, onDeleteDiscount, discount: {loading}
		} = this.props;

		return (
			<form className="poss" onSubmit={handleSubmit(onSubmitForm)}>
				<div className="page_content with_bottom_panel content_padding">

					<div className="form_group form_horizontal">
						<div className="property_label col three">Наименование</div>
						<div className="property_value col nine">
							<InputField
								className="w100"
								name="name"
								required="Укажите наименование"
								autoComplete="off"/>
						</div>
					</div>
					<div className="form_group form_horizontal">
						<div className="property_label col three">Размер, %</div>
						<div className="property_value col four">
							<AmountField
								className="w100"
								name="value"
								autoComplete="off"
								required="Укажите размер скидки"
								validate={[discountValueValidate('Допустима скидка от 0 до 100%')]}/>
						</div>
					</div>

				</div>

				<div className="page_bottom_panel">
					<PrimaryButton type="submit" loading={loading}>Сохранить</PrimaryButton>
					<a className="button middle wide clean" onClick={onCloseForm}>Отмена</a>
					{!isNew &&
					<a className="button middle wide clean mr44 f_right" onClick={onDeleteDiscount}>Удалить</a>}
				</div>
			</form>
		);
	}
}

DiscountEditComponent.propTypes = {
	isNew: PropTypes.bool.isRequired,
	discount: PropTypes.shape({
		loading: PropTypes.bool,
		name: PropTypes.string,
		value: PropTypes.string
	}),
	onSubmitForm: PropTypes.func.isRequired,
	onCloseForm: PropTypes.func.isRequired,
	onDeleteDiscount: PropTypes.func.isRequired
};

export default formName => reduxForm({
	form: formName,
	enableReinitialize: true
})(DiscountEditComponent);