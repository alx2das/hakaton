import React from 'react'
import {NumberInput} from 'common/uiElements';
import {radValidateHoc, CustomFocusable} from './validationHelpers'

@radValidateHoc({tips: true})
class NumberRender extends React.Component {
	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}

	render() {
		const {input, label, className, type, validator, disabled, float}=this.props;
		const {tooltip, addClassName}=validator;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
			<NumberInput ref={field => this.focusator.init(field)}
						 {...input}
						 className={classNames}
						 placeholder={label}
						 float={float}
						 type={type} disabled={disabled}
						 {...tooltip} />
		);
	}
}

export default NumberRender;