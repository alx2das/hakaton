import React from 'react'
import {DatePicker} from 'common/uiElements';
import {radValidateHoc, CustomFocusable} from './validationHelpers'

@radValidateHoc({tips: true})
class DatePickerRender extends React.Component {
	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}

	render() {
		const {input, label, className, validator, disabled}=this.props;
		const {tooltip, addClassName}=validator;
		const classNames = [className || '', addClassName || ''].join(' ');

		return (
			<DatePicker ref={field => this.focusator.init(field)}
						{...input}
						className={classNames}
						placeholder={label}
						disabled={disabled}
						{...tooltip} />
		);
	}
}


export default DatePickerRender;