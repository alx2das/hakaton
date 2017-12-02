import React, {Component, PropTypes} from 'react'
import {Field} from 'redux-form/immutable'
import {radValidateHoc, CustomFocusable} from '../validationHelpers'
import {getRequiredValidator} from 'common/formElements/validationHelpers/formFieldHelpers'
import Autosuggest from 'react-autosuggest'
import throttle from 'throttle-debounce/throttle'
import axios from 'axios'
import ReactTooltip from 'react-tooltip'
import { Map } from 'immutable';
import config from 'common/helpers/clientConfig'

const fields = [
	{
		key: 'region',
		label: 'Регион'
	},
	{
		key: 'city',
		label: 'Населенный пункт'
	},
	{
		key: 'street',
		label: 'Улица'
	},
	{
		key: 'house',
		label: 'Дом'
	},
	{
		key: 'block',
		label: 'Корпус/строение'
	},
	{
		key: 'flat',
		label: 'Квартира'
	}
];

class SearchField extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired
	};

	static defaultProps = {
		requiredFields: {},
		validate: []
	};

	render() {
		const {required, requiredDisable, validate, requiredFields, ...props} = this.props;
		const validateFields = Object.keys(requiredFields).map((key) => {
			return (val) => {
				return val && val.get && val.get(key) ? undefined : { key, text: requiredFields[key] }
			};
		});
		const validators = [...getRequiredValidator({required, requiredDisable}), ...validate, ...validateFields];
		return (
			<Field
				{...props}
				type='text'
				validate={validators}
				component={SearchRender}
			/>
		)
	}
}

@radValidateHoc({tips: true})
class SearchRender extends Component {
	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}

	render() {
		const {input, className, validator, disabled, description} = this.props;
		const {tooltip, addClassName} = validator;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
			<SearchComponent
				ref={s => this.focusator.init(s)}
				className={classNames}
				disabled={disabled}
				description={description}
				{...input}
				{...validator}
			/>
		)
	}
}

class SearchComponent extends Component {

	constructor(props, context) {
		super(props, context);

		const baseUrl = config.DADATA.baseUrl;
		const token = config.DADATA.token;

		this.state = {
			loading: false,
			suggestions: [],
		};

		this.initialStructure = Map({
			address: '',
			region: '',
			city: '',
			street: '',
			house: '',
			block: '',
			flat:''
		});

		this.inputs = {
			region: '',
			city: '',
			street: '',
			house: '',
			block: '',
			flat: ''
		};
		// установка задержки при вводе в поле поиска
		this.instanceQuery = this.instanceQueryInit(baseUrl, token);
		const self = this;
		this.throttle = throttle(500, function (value) {
			self.instanceQuery(value)
				.then((req) => {
					self.setState({
						suggestions: (req && req.data && req.data.suggestions || []).map(item => ({
							value: item.value, data: item
						})),
						loading: false
					});
				});
		});
	}

	instanceQueryInit = (baseURL, token) => {
		const instance = axios.create({
			baseURL,
			timeout: 1000,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': token
			}
		});

		return (value) => instance.post('/address', {query: value, count: 7})
	};

	// смотрим error.key - появится, если валидация не проходит на конкретное поле, при ручном вводе
	setFocus() {
		const { error, value } = this.props;
		if (error && error.key && this.inputs[error.key] && this.props.value.get('custom')) {
			this.inputs[this.props.error.key].focus();
		} else {
			if (value && Object.keys(value).length > 0)
				this.el && this.el.input && this.el.input.focus();
		}
	}

	onClearValue(e) {
		this.props.onChange && this.props.onChange(this.initialStructure.merge({ custom: false }));
	}

	// Будет вызываться каждый раз когда нужно
	// обновить список предложений поиска
	onSuggestionsFetchRequested({value}) {
		this.setState({loading: true});
		this.throttle(value);
	}

	// Будет вызываться каждый раз когда нужно
	// очищать список предложений поиска
	onSuggestionsClearRequested() {
		this.setState({suggestions: []})
	}

	// нормализует data в удобный для нас вид
	normalizeData = (fiasData) => {
		if (fiasData && fiasData.data) {
			return {
				region: fiasData.data.region_with_type || '',
				city: (fiasData.data.city_with_type || '') + (fiasData.data.settlement_with_type ? (fiasData.data.city_with_type ? ', ' : '') + fiasData.data.settlement_with_type : ''),
				street: fiasData.data.street_with_type || '',
				house: ((fiasData.data.house_type || '') + ' ' + (fiasData.data.house || '')).trim(),
				block: ((fiasData.data.block_type || '') + ' ' + (fiasData.data.block || '')).trim(),
				flat: ((fiasData.data.flat_type || '') + ' ' + (fiasData.data.flat || '')).trim(),
				address: fiasData.value || ''
			}
		}
		return this.initialStructure;
	};

	// Вызовется когда элемент будет выбран
	// из списка предложений поиска
	onSuggestionSelected = (e, {suggestion}) => {
		this.props.onChange && this.props.onChange(this.initialStructure.merge(this.normalizeData(suggestion.data), { custom: false }));
		e.stopPropagation();
	};

	// Вызывается при ручном вводе текста в поле
	onChangeComponent = (e, {newValue}) => {
		this.props.onChange && this.props.onChange(this.initialStructure.merge({ custom: false, address: newValue }));
		e.stopPropagation();
	};

	renderInputComponent({...props}) {
		return (
			<div className='react-autosuggest__input-box'>
				<input {...props} />
				{this.state.loading && <div className='loading_block'/>}
				{!!(this.props.value.get && this.props.value.get('address') && !this.props.value.get('custom')) && <a className='input_clear icon-close' onClick={::this.onClearValue}/>}
			</div>
		)
	}


	renderAddress(suggestion, {query}) {
		let data = suggestion.data.data;
		let search = query.split(' ');
		let delOp = [
			data.area_type,
			data.block_type,
			data.city_type,
			data.flat_type,
			data.house_type,
			data.region_type,
			data.settlement_type,
			data.street_type
		];

		let value = suggestion.value;
		search
			.filter(item => delOp.indexOf(item) < 0)
			.forEach(item => {
				value = value.replace(new RegExp(item, 'ig'), '<mark>$&</mark>');
			});

		return <span dangerouslySetInnerHTML={{__html: value}}/>
	}

	onShowCustom = () => {
		const { value } = this.props;
		// если что-то было введено в поле, то посылаем запрос в fias и пробуем заполнить поля сразу, заодно выполняем пред обработку и объединяем несколько полей в 1
		if (value && value.has('address') && value.get('address') && !value.get('custom')) {
			this.setState({loading: true});
			this.instanceQuery(value.get('address'))
				.then((req) => {
					if (req.data && req.data.suggestions && req.data.suggestions[0]) {
						this.props.onChange(Map({
							...this.normalizeData(req.data.suggestions[0]),
							address: req.data.suggestions[0].unrestricted_value || req.data.suggestions[0].value,
							custom: true
						}));
					} else {
						this.props.onChange(this.initialStructure.merge({
							custom: true,
							address: ''
						}));
					}
					this.setState({loading: false});
				})
				.catch(() => {
					this.props.onChange(this.initialStructure.merge({
						custom: true,
						address: ''
					}));
					this.setState({loading: false});
				});
		} else {
			if (value) {
				this.props.onChange(this.initialStructure.merge(value, {
					custom: value.get ? !value.get('custom') : true,
					address: value.get && value.get('address') ? value.get('address') : ''
				}));
			} else {
				this.props.onChange(this.initialStructure.merge({
					custom: true,
					address: ''
				}));
			}

		}
	};

	generateValue = (data) => {
		return fields.reduce((str, { key }) => {
			if (data.get(key))
				return str + (str == '' ? '' : ', ') + data.get(key);
			return str;
		}, '');
	};

	onChangeCustom = (e) => {
		const x = this.initialStructure.merge(this.props.value, { [e.target.name]: e.target.value });
		this.props.onChange(x.set('address', this.generateValue(x)));
		ReactTooltip.rebuild()
	};

	onFocusField = (e) => {
		ReactTooltip.show(e.target);
		e.stopPropagation();
	};
	onFocus = (e) => {
		ReactTooltip.show(e.target);
		this.props.onFocus();
		e.stopPropagation();
	};
	onBlurField = (e) => {
		ReactTooltip.hide(e.target);
		this.props.onBlur();
		e.stopPropagation();
	};

	render() {
		const {error, tooltip, className, description, name, ...props} = this.props;

		const value = this.props.value || this.initialStructure;

		const {suggestions} = this.state;

		let inputProps = {};
		let classNames = '';


		if (!value.get('custom')) {
			inputProps = {
				...inputProps,
				...tooltip
			};
			classNames = [className || ''].join(' ');
		} else {
			classNames = className.split(' ').filter((item) => item != 'error').join(' ');
		}
		inputProps = {
			...inputProps,
			name,
			className: classNames,
			value: value.get('address') || '',
			onChange: this.onChangeComponent,
			onBlur: ::this.onBlurField,
			autoComplete: 'off',
			onFocus: this.onFocus,
			disabled: value.get('custom')
		};
		return (
			<div>
				<div className={value.get('custom') ? 'disabled_blocks' : ''}>
					<Autosuggest
						ref={el => this.el = el}
						// Required
						suggestions={suggestions}
						onSuggestionsFetchRequested={::this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={::this.onSuggestionsClearRequested}
						getSuggestionValue={(suggestion) => suggestion.value}
						renderSuggestion={::this.renderAddress}
						inputProps={{ ...inputProps }}
						// Options
						onSuggestionSelected={this.onSuggestionSelected}
						renderInputComponent={::this.renderInputComponent}
					/>
					<div className="description">{description}
					</div>
				</div>
				<div className="manual_input_address">
					<input type="checkbox" checked={!!value.get('custom')} name="cga3" id="man_input" onClick={this.onShowCustom} />
					<label for="man_input" className="label_check">
						<i className="icon"></i>
						<span>Ручной ввод адреса</span>
					</label>
					{value.get('custom') &&
					<div className="inputs_block  info_success">
						{fields.map((item) => <div key={item.key} className="form_group form_horizontal">
							<div className="property_label col two">{item.label}</div>
							<div className="property_value col ten">
								<input
									type="text"
									onChange={this.onChangeCustom}
									name={item.key}
									value={value.get(item.key) || ''}
									{...(error && error.key == item.key ? { ...tooltip, className: classNames + ' error' } : { className: classNames })}
									ref={(ref) => { this.inputs[item.key] = ref; }}
									onBlur={this.onBlurField}
									onFocus={this.onFocusField}
								/>
							</div>
						</div>)}
					</div>
					}
				</div>
			</div>
		)
	}
}

export {SearchField, SearchRender, SearchComponent}; // for test
export default SearchField;