import React from 'react';
import {Select} from 'common/uiElements';
import Selector from 'react-select';
import {
	AmountField,
	InputField,
	PhoneField,
	NumberField,
	SelectField,
	SwitchField,
	TextAreaField
} from 'common/formElements/fields';
import {reduxForm} from 'common/formElements'
import {connect} from 'react-redux';
import {Field, focus, change, getFormValues} from 'redux-form/immutable';
import {isRequired} from 'common/validators'
import modifierForm from 'modules/products/components/ProductCard/ModifierForm'
import {withRouter} from 'react-router';

const getOptions = () => {
	return [
		{value: 'one', label: 'One'},
		{value: 'two', label: 'Two'}
	];
};

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {options: []}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				options: getOptions()
			})
		}, 5000);
	}

	handleSearch() {
		// this.setState({
		// 	groups: [{
		// 		label: new Date().getTime(),
		// 		value: '1'
		// 	},
		// 		{
		// 			label: new Date().getTime(),
		// 			value: '2'
		// 		}]
		// })
	}

	render() {
		const save = (props) => {
			console.log('submit testform', props);
			this.setState({ff: 1});
		};
		const {handleSubmit}=this.props;
		const {options} = this.state;

		return (<form onSubmit={handleSubmit(save)}>

			<SelectField name="select1" options={options}
						 searchable={true}
						 placeholder="TEST"
						 creatable={false}
						 validate={[isRequired('Укажите')]}
						 onInputChange={::this.handleSearch}/>

			<div className="w100 m_top_10"></div>

			<SelectField name="select2" options={options}
						 searchable={true}
						 creatable={true}
						 promptTextCreator={label => "Новый товар: " + label}
						 placeholder="FORM SELECT"
						 validate={[isRequired('Укажите')]}/>

			<InputField name="text" class="m_top_10"/>

			<div className="w100 m_top_10"></div>

			<button type="submit" className="button middle wide">отправить</button>
		</form>)
	}
}

const SelectForm = reduxForm({
	form: 'testForm'
})(Form);


@withRouter
@connect(mapStateProps, mapDispatchToProps)
class TestSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: "", options: [
				{value: 'one', label: 'One'},
				{value: 'two', label: 'Two'}
			]
		};
		this.modifierForm = modifierForm(1, 2);
	}


	logChange(val) {
		//console.log("Selected: ", val);
		this.setState({selected: val ? val.value : null})
	}

	logChange2(val) {
		//console.log("Selected: ", val);
		this.setState({val: val})
	}


	render() {


		return (
			<div style={{minHeight: '500px'}}>
				<Select name="form-field-name"
						placeholder=""
						searchable={true}
						value={this.state.selected}
						onChange={::this.logChange} options={this.state.options}/>

				<div className="w100 m_top_20"></div>
				<Selector.Creatable name="form-field-name11"
									placeholder=""
									searchable={true}
									value={this.state.val}
									onChange={::this.logChange2} options={this.state.options}/>

				<div className="w100 m_top_20"></div>

				<div class="form-group">
					<h2>Форма</h2>
					<SelectForm initialValues={{select2: 'one'}}/>
				</div>

			</div>
		);
	}
}


function mapStateProps(state) {
	const formData = getFormValues('testForm')(state);
	return {formData};
}

function mapDispatchToProps(dispatch) {
	return {dispatch};
}
export default TestSelector

