import React from 'react';
import {PhoneField} from 'common/formElements/fields';
import {reduxForm, NumberCounterRender} from 'common/formElements'
import {connect} from 'react-redux';
import {Field, focus, change, getFormValues} from 'redux-form/immutable';
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
		const {handleSubmit, formData}=this.props;

		return (<form onSubmit={handleSubmit(save)}>

			<div className="w100 m_top_10"></div>
			<PhoneField name="phone" label="Phone" required="test"/>
			<span className="m_left_5 info_label">{formData && formData.get('phone')}</span>

			<div className="w100 m_top_20"></div>

			<button type="submit" className="button middle wide">отправить</button>
			<button type="button" onClick={::this.handleReset} className="button middle wide clean">сбросить</button>
		</form>)
	}
}

const TestPhoneForm = reduxForm({
	form: 'testFormPhone'
})(Form);


@withRouter
@connect(mapStateProps, mapDispatchToProps)
class TestPhone extends React.Component {
	render() {

		const {formData}=this.props;

		console.log(formData);

		return (
			<div class="widget_block">
				<div class="form-group">
					<h2>Форма 2</h2>
					<TestPhoneForm formData={formData}/>
				</div>
			</div>
		);
	}
}


function mapStateProps(state) {
	const formData = getFormValues('testFormPhone')(state);
	return {formData};
}

function mapDispatchToProps(dispatch) {
	return {dispatch};
}
export default TestPhone

