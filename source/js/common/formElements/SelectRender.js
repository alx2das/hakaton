import React from 'react'
import {Select} from 'common/uiElements';
import {radValidateHoc, CustomFocusable} from './validationHelpers'
import ReactTooltip from 'react-tooltip'
import ReactDOM from 'react-dom';

@radValidateHoc({tips: true, dataOnWrapper: true})
class SelectRender extends React.Component {

	constructor(props) {
		super(props);
		this.focusator = new CustomFocusable();
	}
	componentDidMount() {
		// TODO: исправить, костыль
		this.focusator.init(this.refInput);
		ReactDOM.findDOMNode(this.refInput).setAttribute('data-for', this.props.validator.tooltip['data-for']);
		ReactDOM.findDOMNode(this.refInput).setAttribute('data-tip', "");
	}
	render() {
		const {
			input:fieldInput, className, validator: {tooltip, addClassName},
			onSelectChange, onSelectBlur, valueKey = 'value', required, ...selectOptions
		}=this.props;

		let {onChange:onInputChange, onBlur:onInputBlur, ...input}=fieldInput;

		if (input.value == "") { //хак, при пустой строке показывается будто выбран элемент
			input.value = undefined;
		}

		const onChangeSelect = (obj) => {
			onInputChange(obj ? obj[valueKey] : null);
			if (onSelectChange)
				onSelectChange(obj);
		};

		const onBlurSelect = (event) => {
			onInputBlur(input.value);
			if (onSelectBlur)
				onSelectBlur(event);
		};
		// отменяем всплытие события и вручную вызываем показ tooltip, иначе теряется currentTarget при перерендере
		const onFocus = (e) => {
			ReactTooltip.show(e.target.parentNode.parentNode.parentNode.parentNode);
			fieldInput.onFocus();
			e.stopPropagation();
		}
		const classNames = [className || '', addClassName || ''].join(' ');
		return (<Select ref={s => this.refInput = s }
						className={classNames}
						{...input}
						{...selectOptions}
						inputProps={{...tooltip}}
						onFocus={onFocus}
						valueKey={valueKey}
						onChange={onChangeSelect}
						onBlur={onBlurSelect}
		/>);
	}
}

SelectRender.propTypes = Select.propTypes;

export default SelectRender;



