import React from 'react';
import {isEmpty} from 'common/validators';
import {InputField, AmountField, SelectField} from 'common/formElements/fields';
import {
	VAT_TAG_OPTIONS,
	TAX_MODE_OPTIONS,
	ALCOHOL_OPTIONS,
	MEASURE_OPTIONS
} from 'modules/core/productEnums';

const minPriceValidate = (error) => (price, allValues) => {
	const minPrice = allValues.get('minPrice');
	if (!isEmpty(minPrice) && !isEmpty(price)) {
		return minPrice > price ? error : undefined;
	}
	return undefined;
};

class ProductTab extends React.Component {
	render() {
		const {className, isEdit}=this.props;

		return (
			<div className={className}>

				<div class="form_group form_horizontal">
					<div class="property_label col three three">Наименование *</div>
					<div class="property_value col six">
						<InputField name="name"
									class="w100"
									maxLength="128"
									required="Укажите наименование"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Код *</div>
					<div class="property_value col six">
						<InputField name="inventCode" disabled={isEdit}
									class="w100"
									required="Укажите код"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Штрих-код *</div>
					<div class="property_value col six">
						<InputField name="barcode"
									class="w100"
									required="Укажите штрих-код"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Цена</div>
					<div class="property_value col six">
						<AmountField name="price"
									 class="w100"
									 validate={[minPriceValidate('Цена не должна быть меньше минимальной')]}
						/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Мин. цена</div>
					<div class="property_value col six">
						<AmountField name="minPrice"
									 class="w100"/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Ед. изм.</div>
					<div class="property_value col six">
						<SelectField class="w100"
									 name="measure"
									 clearable={false}
									 placeholder="Ед. изм."
									 options={MEASURE_OPTIONS}
						/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Тип</div>
					<div class="property_value col six">
						<SelectField class="w100"
									 name="alcoholType"
									 placeholder="Тип"
									 clearable={false}
									 options={ALCOHOL_OPTIONS}
						/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">НДС</div>
					<div class="property_value col six">
						<SelectField class="w100"
									 name="vatTag"
									 placeholder="НДС"
									 clearable={false}
									 options={VAT_TAG_OPTIONS}
						/>
					</div>
				</div>

				<div class="form_group form_horizontal">
					<div class="property_label col three">Налогообложение</div>
					<div class="property_value col six">
						<SelectField class="w100"
									 name="taxMode"
									 placeholder="Налогообложение"
									 clearable={false}
									 options={TAX_MODE_OPTIONS}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductTab;