import React from 'react';
import {reduxForm} from 'common/formElements';
import PropTypes from 'prop-types';
import {PrimaryButton} from 'common/uiElements';
import {NumberCounterRender} from 'common/formElements';
import {AmountField, NumberField, SelectField, InputField, Field} from 'common/formElements/fields'
import modifierShape from './modifierShape';


class ModifierForm extends React.Component {

	handleSelectProduct(product) {
		const {change, onSearchProducts, searchProductsView:{products}}=this.props;
		if (product == null) {
			change('goodsName', '');
			if (products.length <= 1)
				onSearchProducts('');
		}
		else {
			change('name', product.name);
			change('goodsName', product.name);
			change('price', product.price);
		}
	}

	render() {
		const {
			handleSubmit, onSave, onCancel, initialValues, saving,
			searchProductsView, onSearchProducts, onRemove
		} = this.props;
		return (

			<form onSubmit={handleSubmit(onSave)} className="poss">
				<Field name="goodsName" component="input" class="hidden"/>
				<div class="page_content with_bottom_panel  content_padding">

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Товар</div>
						<div class="property_value col nine">
							<SelectField name="barcode" className="w100"
										 searchable={true}
										 isLoading={searchProductsView.loading}
										 onInputChange={onSearchProducts}
										 onChange={::this.handleSelectProduct}
										 valueKey="inventCode"
										 labelKey="name"
										 placeholder="Выберите товар"
										 options={searchProductsView.products}
										 required="Выберите товар"/>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Название</div>
						<div class="property_value col nine">
							<InputField name="name"
										class="w100"
										required="Укажите наименование"/>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Кол-во</div>
						<div class="property_value col nine">
							<NumberField name="qty" type="text" component={NumberCounterRender}
										 required="Укажите количество" minValue={1}/>
						</div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_label col w100px">Цена</div>
						<div class="property_value col add_modificators_price">
							<AmountField name="price"/>
						</div>
						<div class="property_label  col  one"><span class="cur rur"><span>р.</span></span></div>
					</div>

					<div class="form_group form_horizontal">
						<div class="property_value col nine">
							<Field id="modifierSelectedField" name="selected" type="checkbox" component="input"/>
							<label for="modifierSelectedField" className="label_check switcher m_top_15">
								<i className="icon"></i>
								<span className="m_left_45">Выбран по умолчанию</span>
							</label>
						</div>
					</div>

				</div>
				<div class="page_bottom_panel">
					<PrimaryButton type="submit" loading={saving}>Сохранить</PrimaryButton>
					<a class="button middle wide clean" onClick={onCancel}>Отмена</a>
					{!initialValues.get('isNew') && <a class="button middle wide clean f_right" onClick={onRemove}>Удалить</a>}
				</div>
			</form>
		)
	}
}

ModifierForm.propTypes = {
	onSave: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	initialValues: modifierShape,
	saving: PropTypes.bool,
	searchProductsView: PropTypes.any,
	onSearchProducts: PropTypes.func.isRequired
};

export default (key) => reduxForm({form: key})(ModifierForm);

