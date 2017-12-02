import React from 'react';
import {NumberInput, NumberFormat} from 'common/uiElements';
import {NumberField} from 'common/formElements/fields';
import {reduxForm, NumberCounterRender} from 'common/formElements'
import {connect} from 'react-redux';
import {Field, focus, change, getFormValues} from 'redux-form/immutable';
import {isRequired} from 'common/validators'
import {withRouter} from 'react-router';

class Form extends React.Component {
	constructor(props) {
		super(props);
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

			<div className="w100 m_top_10"></div>
			<NumberField name="price3" float={true} label="Float" required="test"/>

			<div className="w100 m_top_10"></div>
			<NumberField name="price" required="test"/>

			<div className="w100 m_top_10"></div>
			<NumberField name="price2" component={NumberCounterRender} minValue={0}/>
			<div className="w100 m_top_20"></div>

			<button type="submit" className="button middle wide">отправить</button>
			<button type="button" onClick={::this.handleReset} className="button middle wide clean">сбросить</button>
		</form>)
	}
}

const TestNumberForm = reduxForm({
	form: 'testForm122'
})(Form);


@withRouter
@connect(mapStateProps, mapDispatchToProps)
class TestNumbers extends React.Component {
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

		console.log(formData);

		return (
			<div class="widget_block">
				{/*<AmountInput value={this.state.amount} onChange={::this.handleChange}/>*/}
				<div className="w100 m_top_20"></div>

				<NumberInput placeholder="Integer" value={this.state.amount2} onChange={::this.handleChange2}/>
				<NumberFormat value={this.state.amount2} className="m_left_5 info_label"/>
				<div className="w100 m_top_20"></div>

				<NumberInput placeholder="Float" float={true} value={this.state.amount} onChange={::this.handleChange}/>
				<NumberFormat value={this.state.amount} className="m_left_5 info_label"/>
				<div className="w100 m_top_20"></div>

				<div class="form-group">
					<h2>Форма 2</h2>
					<TestNumberForm initialValues={{price: 12.1}}/>
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
export default TestNumbers

