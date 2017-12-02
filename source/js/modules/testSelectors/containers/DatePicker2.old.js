import React from 'react'
import {reduxForm} from 'common/formElements'

//import DatePicker from 'common/uiElements/DatePicker'
import DatePickerField from 'common/uiElements/DatePickerField'
import DatePickerRender from 'common/uiElements/DatePickerRender'


class DatePicker2 extends React.Component {

	render() {
		const {handleSubmit} = this.props;

		return (
			<div>
				<h1>Вариант 1: DatePickerField в форме</h1>
				<form onSubmit={handleSubmit((props) => console.log('onSubmit', props.toJS()))}>
					<DatePickerField name="one" startDate={new Date()} />
					<div>
						<button className="button small">Отправить</button>
					</div>
				</form>

				<br /><br />

				<h1>Вариант 2: DatePickerRender простой компонент</h1>
				<div onSubmit={handleSubmit((props) => console.log('onSubmit', props.toJS()))}>
					<DatePickerRender startDate={new Date()} onChange={() => console.log('onChange')} />
				</div>

				<br /><br />

				<h1>Вариант 3: DatePicker простой</h1>
				<div onSubmit={handleSubmit((props) => console.log('onSubmit', props.toJS()))}>
					<DatePicker name="var_3" startDate={new Date()} onChange={() => console.log('onChange')} />
				</div>
			</div>
		)
	}
}

export default reduxForm({form: 'date-picker-2'})(DatePicker2);