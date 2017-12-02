import React from 'react'
import {radValidateHoc, CustomFocusable} from './validationHelpers'
import {NumberInput} from 'common/uiElements';
import {change} from 'redux-form/immutable'
import {isEmpty} from 'common/validators';

@radValidateHoc({tips: true})
class NumberCounterRender extends React.Component {

	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}

	handleChangeByStep(direction) {
		const {input, meta, step = 1, maxValue = null, minValue = null}=this.props;
		let newVal = parseFloat(input.value || 0) + (step * direction);
		if (!isEmpty(maxValue) && newVal > maxValue)
			return;
		if (!isEmpty(minValue) && newVal < minValue)
			return;
		meta.dispatch(change(meta.form, input.name, newVal))
	}

	handleIncrease() {
		this.handleChangeByStep(1);
	}

	handleDecrease() {
		this.handleChangeByStep(-1);
	}

	render() {
		const {input, label, className, type, validator, disabled, buttonsClassNames = 'counter  small'}=this.props;
		const {tooltip, addClassName}=validator;
		const classNames = [className || '', addClassName || ''].join(' ');
		return (
			<div className={buttonsClassNames}>
				<a className="count_ctrl" onClick={::this.handleDecrease}>&minus;</a>
				<NumberInput {...input}
					   ref={input => this.focusator.init(input)}
					   className={classNames}
					   placeholder={label}
					   type={type} disabled={disabled}
					   {...tooltip} />
				<a className="count_ctrl" onClick={::this.handleIncrease}>+</a>
			</div>
		);
	}
}

export default NumberCounterRender;