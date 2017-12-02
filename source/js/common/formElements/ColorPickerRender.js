import {change} from 'redux-form/immutable'
import React from 'react'
import PropTypes from 'prop-types'

const ColorPickerRender = (props) => {
	const {input, className, colors, meta}=props;
	const isSelectedColor = color => input && input.value == color;
	const handleChangeColor = color => meta.dispatch(change(meta.form, input.name, color));

	return (<div className={className}>
		{colors.map((color, i) => (<a key={'color_picker_' + i}
									  className={isSelectedColor(color) ? 'icon-check' : ''}
									  style={{background: color}}
									  onClick={() => handleChangeColor(color)}></a>)
		)}</div>);

};

ColorPickerRender.propTypes = {
	colors: PropTypes.array.isRequired
};

export default ColorPickerRender;