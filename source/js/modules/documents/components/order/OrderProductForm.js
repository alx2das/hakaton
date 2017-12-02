import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'
import {InputField, SelectField, NumberField, AmountField, Field} from 'common/formElements/fields'
import {VAT_TAG_OPTIONS, MEASURE_OPTIONS} from 'modules/core/productEnums';
import {initialize} from 'redux-form/immutable'

class OrderProductForm extends React.Component {

	handleSelectProduct(product) {
		const {change}=this.props;
		change('isNew', product && product.isNew);

		if (product) {
			change('name', product.name);
			change('measure', product.measure);
			change('vatTag', product.vatTag);
			change('price', product.price);
			change('minPrice', product.minPrice);
			change('barcode', product.barcode);
		} else {
			change('name', '');
			change('price', null);
			change('minPrice', null);
			change('barcode', null);
		}
	}

	newOptionCreator({label, labelKey, valueKey}) {
		const option = {};
		option[valueKey] = label;
		option[labelKey] = label;
		option.isNew = true;
		return option;
	}

	handleChangePrice(price) {
		logger.log(price);
	}

	handleSave(props) {
		const {onSave, dispatch, initialValues}=this.props;
		onSave(props);
		dispatch(initialize(this.props.form, initialValues, false));
	}

	render() {
		const {
			handleSubmit, productSearchState:{loading, products, error},
			className = '', onSearchProducts
		} = this.props;

		return (
			<form className={className} onSubmit={handleSubmit(::this.handleSave)}>
				<div class="add_order_form">
					<Field className="hidden" name="isNew" component="input" type="checkbox"/>
					<Field className="hidden" name="name" component="input"/>
					<Field className="hidden" name="barcode" component="input"/>
					<Field className="hidden" name="minPrice" component="input"/>

					<div class="add_order_form__product input_group_title">
						<div class="input_title">Товар</div>
						<SelectField required="Укажите полное наименование товара"
									 options={products}
									 wrapperClassName=""
									 searchable={true}
									 isLoading={loading}
									 tipPlace="top"
									 className="small"
									 labelKey="name"
									 valueKey="inventCode"
									 clearable={true}
									 creatable={true}
									 onInputChange={onSearchProducts}
									 newOptionCreator={::this.newOptionCreator}
									 onChange={::this.handleSelectProduct}
									 name="inventCode"/>
					</div>

					<div class="add_order_form__comment input_group_title">
						<div class="input_title">Комментарий</div>
						<InputField class="small"
									name="description"/>
					</div>

					<div class="add_order_form__price input_group_title">
						<div class="input_title">Цена</div>
						<AmountField required="Укажите цену товара"
									 name="price"
									 tipPlace="top"
									 onChange={::this.handleChangePrice}
									 class="small"/>
					</div>

					<div class="add_order_form__amount input_group_title">
						<div class="input_title">Кол-во</div>
						<NumberField name="quantity" float={true}
									 class="small"/>
					</div>
					<div class="add_order_form__units input_group_title">
						<div class="input_title">Ед. изм.</div>
						<SelectField name="measure"
									 clearable={false}
									 tipPlace="top"
									 required="Выберите ед. изм."
									 className="small"
									 options={MEASURE_OPTIONS}/>
					</div>
					<div class="add_order_form__nds input_group_title">
						<div class="input_title">НДС</div>
						<SelectField name="vatTag"
									 clearable={false}
									 tipPlace="top"
									 required="Выберите НДС"
									 className="small"
									 options={VAT_TAG_OPTIONS}/>
					</div>
				</div>

				<button class="button  small  wide  light">Добавить</button>
			</form>
		);
	}
}


OrderProductForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	productSearchState: PropTypes.shape({
		loading: PropTypes.bool,
		error: PropTypes.any,
		products: PropTypes.arrayOf(PropTypes.shape({
			inventCode: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		}))
	}),
	onSearchProducts: PropTypes.func,
	className: PropTypes.string
};

OrderProductForm = reduxForm({
	form: 'orderProductForm'
})(OrderProductForm);


export default OrderProductForm;