import React from 'react';
import {AmountInput, AmountFormat} from 'common/uiElements';
import {AmountField} from 'common/formElements/fields';
import {reduxForm} from 'common/formElements'
import {connect} from 'react-redux';
import {Field, focus, change, getFormValues} from 'redux-form/immutable';
import {isRequired} from 'common/validators'
import {withRouter} from 'react-router';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {options: [], price: 12}
	}

	handleReset() {
		this.props.reset();
	}

	render() {
		const save = (props) => {
			console.log('submit testform', props);
			this.setState({ff: 1});
		};
		const {handleSubmit, formState}=this.props;

		const price = formState && formState.get('price');

		return (<form onSubmit={handleSubmit(save)}>


			<div className="w100 m_top_10"></div>
			<AmountField name="price" required="test"/>
			<AmountFormat value={price} className="m_left_5 info_label"/>
			<div className="w100 m_top_20"></div>
			<button type="submit" className="button middle wide">отправить</button>
			<button type="button" onClick={::this.handleReset} className="button middle wide clean">сбросить</button>
		</form>)
	}
}

const TestAmountForm = reduxForm({
	form: 'testForm1'
})(Form);


@withRouter
@connect(mapStateProps, mapDispatchToProps)
class TestSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: 1
		};
	}

	handleChange(val, e) {
		this.setState({
			amount: val
		});
	}

	handleChange2(val, e) {
		this.setState({
			amount2: val
		});
	}

	render() {
		const {formData}=this.props;

		return (
			<div class="widget_block">
				{/*<AmountInput value={this.state.amount} onChange={::this.handleChange}/>*/}
				<div className="w100 m_top_20"></div>
				<AmountInput value={this.state.amount2} onChange={::this.handleChange2}/>
				<AmountFormat value={this.state.amount2} className="m_left_5 info_label"/>
				<div className="w100 m_top_20"></div>

				<div class="form-group">
					<h2>Форма 2</h2>
					<TestAmountForm formState={formData} initialValues={{price: 12}}/>
				</div>
			</div>
		);
	}
}


function mapStateProps(state) {
	const formData = getFormValues('testForm1')(state);
	return {formData};
}

function mapDispatchToProps(dispatch) {
	return {dispatch};
}
export default TestSelector

