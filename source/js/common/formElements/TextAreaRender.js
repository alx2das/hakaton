import React from 'react'
import {radValidateHoc, InputFocusable} from './validationHelpers'


@radValidateHoc({tips: true})
class TextAreaRender extends React.Component {

	constructor(props) {
		super(props);
		this.focusator = new InputFocusable();
	}

	render() {
		const {input, label, className, type, validator, disabled}=this.props;
		const {tooltip, addClassName}=validator;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
			<textarea {...input}
				   ref={input => this.focusator.init(input)}
				   className={classNames}
				   placeholder={label}
				   type={type} disabled={disabled}
				   {...tooltip} />
		);
	}
}

export default TextAreaRender;