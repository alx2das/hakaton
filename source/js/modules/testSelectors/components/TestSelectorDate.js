import React from 'react';
import {Select, DatePickerRange, DatePicker} from 'common/uiElements';
import Selector from 'react-select';
import {
	DatePickerField
} from 'common/formElements/fields';
import {reduxForm} from 'common/formElements'
import {connect} from 'react-redux';
import {Field, focus, change, getFormValues} from 'redux-form/immutable';
import {isRequired} from 'common/validators'
import {withRouter} from 'react-router';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {options: []}
	}

	componentDidMount() {
		setTimeout(() => {

		}, 5000);
	}

	handleReset() {
		this.props.reset();
	}

	render() {
		const save = (props) => {
			console.log('submit testform', props);
			this.setState({ff: 1});
		};
		const {handleSubmit}=this.props;

		return (<form onSubmit={handleSubmit(save)}>

			{/*<DatePickerField name="date1" required="Укажите дату"/>*/}

			{/*<div className="w100 m_top_10"></div>*/}

			{/*<DatePickerField name="date2" required="Укажите дату"/>*/}

			{/*<div className="w100 m_top_10"></div>*/}

			<DatePickerField name="date3" required="Укажите дату"/>

			<div className="w100 m_top_10"></div>

			<button type="submit" className="button middle wide">отправить</button>
			<button type="button" onClick={::this.handleReset} className="button middle wide clean">сбросить</button>
		</form>)
	}
}

const DateForm = reduxForm({
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
			],
			date1: null,
			range: {
				d1: new Date(),
				d2: new Date()
			}
		};
		//this.modifierForm = modifierForm(1, 2);
	}

	handleChange(d) {
		this.setState({
			date1: d
		});
		console.log('handleChange', d);
	}

	handleChangeRange(range) {
		this.setState({
			range: {
				d1: range.dateFrom,
				d2: range.dateTo
			}
		});
	}


	render() {

		const {formData}=this.props;

		console.log(formData);

		return (
			<div class="widget_block">
				<DatePicker value={this.state.date1} onChange={::this.handleChange}/>
				<div className="w100 m_top_20"></div>

				<DatePickerRange dateFrom={this.state.range.d1}
				dateTo={this.state.range.d2}
				onChange={::this.handleChangeRange} />
				<div className="w100 m_top_20"></div>

				<div class="form-group">
				<h2>Форма</h2>
				<DateForm initialValues={{date1: new Date()}}/>
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

