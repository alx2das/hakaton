import React from 'react'
import {PhoneInput} from 'common/uiElements';
import {radValidateHoc, CustomFocusable} from './validationHelpers'

@radValidateHoc({tips: true})
class PhoneRender extends React.Component {
	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}

	render() {
		const {input, label, className, type, validator, disabled}=this.props;
		const {tooltip, addClassName}=validator;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
			<PhoneInput ref={field => this.focusator.init(field)}
						{...input}
						className={classNames}
						placeholder={label}
						type={type}
						disabled={disabled}
						{...tooltip} />
		);
	}
}

export default PhoneRender;