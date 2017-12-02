import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'common/formElements'
import {connect} from 'react-redux'
import {formValueSelector} from 'redux-form/immutable'
import {Field, InputField, SelectField, FieldArray, SearchField} from 'common/formElements/fields'
import {PrimaryButton} from 'common/uiElements'
import {getOnlyNumber} from 'common/validators';
import toJS from 'components/HOC/toJs'

import * as enums from '../../enums/registerKKTEnums'
import {TAX_MODE_OPTIONS} from 'modules/core/productEnums'


const nameForm = 'registerKKTForm';
const selectorFrom = formValueSelector(nameForm);
const lengthCodeFNS = (text) => (val) => val && val.length == 4 ? undefined : text;
const requiredAddressValidate = (text) => (val) => val && val.get && val.get('address') ? undefined : text;
const selectListValidate = (text) => (val) => val && val.get && !val.get('custom') && !(val.get('region')
	|| val.get('city') || val.get('street') || val.get('house') || val.get('block') || val.get('flat')) ? text : undefined;

function mapStateToProps(state) {
	const retailPointTypes = selectorFrom(state, 'retailPointTypes');	// выбор: как использовать
	const twoTMode = !(selectorFrom(state, 'twoTaxMode'));				// выбор: две СНО
	const taxMode = selectorFrom(state, 'taxMode');
	const secondaryTaxMode = selectorFrom(state, 'secondaryTaxMode');

	return {retailPointTypes, twoTMode, taxMode, secondaryTaxMode}
}

@reduxForm({form: nameForm})
@connect(mapStateToProps)
@toJS
export default class RegisterForm extends Component {

	static propTypes = {
		onSubmitForm: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.optionTaxMode = TAX_MODE_OPTIONS.filter(item => item.value !== '0');
	}

	render() {
		const {
			handleSubmit, onSubmitForm,
			retailPointTypes, kktPlaceDesc,
			twoTMode, taxMode, secondaryTaxMode
		} = this.props;
		const showForm = retailPointTypes && (Object.keys(enums.KKT_PLACE_DESC).reduce((prev, key) => prev || retailPointTypes[key], false));
		const titleListType = (Object.keys(retailPointTypes || {}) || []).filter(k => retailPointTypes[k]);
		return (
			<div className='page_content content_padding'>
				<form className="poss" onSubmit={handleSubmit(onSubmitForm)}>

					<div className='form_group how_use_kkt'>
						<div className='fw_m'>Как вы планируете использовать кассу?</div>
						<FieldArray name='retailPointTypes' component={({retailPoint, index, fields}) =>
							<div>
								<div className='option'>
									<Field name='retailPointTypes.offline' value='offline'
										   type='checkbox' component='input' id='rpt_offline'/>
									<label htmlFor='rpt_offline' className='label_check'>
										<i className='icon'/> <span>Проведение продаж или оказание услуг</span>
									</label>
									<div className='description'>Касса будет установлена в точке продаж или месте
										оказания
										услуг
									</div>
								</div>
								<div className='option'>
									<Field name='retailPointTypes.online' value='online'
										   type='checkbox' component='input' id='rpt_retail'/>
									<label htmlFor='rpt_retail' className='label_check'>
										<i className='icon'/> <span>Расчеты в сети интернет</span>
									</label>
									<div className='description'>Касса будет использоваться для продаж
										интернет-магазина
									</div>
								</div>
								<div className='option'>
									<Field name='retailPointTypes.delivery' value='delivery'
										   type='checkbox' component='input' id='rpt_online'/>
									<label htmlFor='rpt_online' className='label_check'>
										<i className='icon'/> <span>Развозная или разносная торговля</span>
									</label>
									<div className='description'>Касса будет использоваться курьерской службой или
										службой
										доставки
									</div>
								</div>
							</div>
						}/>
					</div>
					<div className={`light_block kkt_info ${!showForm && 'disabled_blocks'}`}>
						<div className='input_group_title'>
							<div className="title">Где будет установлена касса</div>
							<InputField name='kktPlace' className='small w100'
										required="Укажите, где будет установлена касса"
										maxLength="80"
										autoComplete="off"
										tipPlace="top"/>
							<div className="description">{kktPlaceDesc}</div>
							{retailPointTypes &&
							<div>
								<div>
									{titleListType.length > 1 && <div>Укажите последовательно через пробел:</div>}
									{Object.keys(enums.KKT_PLACE_DESC).map((key) =>
										!!(retailPointTypes[key]) ? <div className="description"
																		 key={key}>{enums.KKT_PLACE_DESC[key]}</div> : false
									)}
								</div>
							</div>
							}
						</div>

						<div className='input_group_title'>
							<div className="title">Адрес установки кассы</div>
							<SearchField
								name='kktAddress'
								className='small w100'
								tipPlace="top"
								requiredFields={{
									city: 'Укажите город',
									street: 'Укажите улицу',
									house: 'Укажите дом'
								}}
								validate={[
									requiredAddressValidate('Укажите адрес установки кассы'),
									selectListValidate('Выберите адрес из списка')
								]}
							/>
						</div>

						<div className='input_group_title'>
							<div className="title">Система налогообложения</div>
							<flex className='gap12'>
								<SelectField name='taxMode'
											 clearable={false}
											 required="Обязателен для заполнения"
											 options={secondaryTaxMode ? this.optionTaxMode.filter((item) => item.value != secondaryTaxMode) : this.optionTaxMode}/>
								{!twoTMode &&
								<SelectField name='secondaryTaxMode'
											 required="Обязателен для заполнения"
											 requiredDisable={twoTMode}
											 clearable={false}
											 options={taxMode ? this.optionTaxMode.filter((item) => item.value != taxMode) : this.optionTaxMode}/>
								}
							</flex>
							<div className='two_nalog_system'>
								<Field name='twoTaxMode' type='checkbox' component='input' id='id_twoTaxMode'/>
								<label htmlFor='id_twoTaxMode' className='label_check'>
									<i className='icon'/>
									<span>Две системы налогообложения</span>
								</label>
							</div>
						</div>

						<div className='input_group_title'>
							<div className="title">Код налоговой по месту регистрации</div>
							<InputField
								name='kktFnsCode'
								className='small w30'
								autoComplete="off"
								normalize={(val) => getOnlyNumber(val, 4)}
								validate={[
									lengthCodeFNS("Длина кода должна составлять 4 цифры")
								]}
							/>
							<div className="description">
								Код налоговой, в которой зарегистрирована ваша компания<br/>
								Код можно узнать по ссылке <a href='//service.nalog.ru/addrno.do' target='_blank'>service.nalog.ru/addrno.do</a>
							</div>
						</div>

						<div className='input_group_title'>
							<div className="title">Код налоговой места установки кассы</div>
							<InputField
								name='fnsCode'
								className='small w30'
								autoComplete="off"
								normalize={(val) => getOnlyNumber(val, 4)}
								validate={[
									lengthCodeFNS("Длина кода должна составлять 4 цифры")
								]}
							/>
							<div className="description">
								Код налоговой, обслуживающей адрес, по которому установлена касса
							</div>
						</div>

						<div className='input_group_title'>
							<div className="title">Пин-ОФД</div>
							<InputField
								name='ofdPinCode'
								maxLength="6"
								className='small w30'
								autoComplete="off"
							/>
							<div className="description">
								Введите пин-ОФД, полученный при регистрации подписки
							</div>
						</div>

						<div className='input_group_title'>
							<div className="title">Режим использования кассы</div>
							<FieldArray name='kktMode' component={({fields}) =>
								<section>
									{enums.KKT_MODE_ARR.map((mode, index) =>
										<div className='mb12' key={`key_${index}`}>
											<Field name={`kktMode[${mode.val}]`} type='checkbox' component='input'
												   id={`id_${index}`}/>
											<label htmlFor={`id_${index}`} className='label_check'>
												<i className='icon'/>
												<span>{mode.label}</span>
											</label>
										</div>
									)}
								</section>
							}/>
						</div>
					</div>

					<div className={`form_buttons ${!showForm && 'disabled_blocks'}`}>
						<PrimaryButton type="submit">Отправить в ФНС</PrimaryButton>
						<PrimaryButton className="button_clean" type="button"
									   onClick={handleSubmit((props) => onSubmitForm(props, true))}
						>Сохранить как черновик</PrimaryButton>
					</div>

				</form>
			</div>
		)
	}
}