import PropTypes from 'prop-types'
import React from 'react'

const FilterCheckBox = ({checked, onChange, id, label}) => {
	return (<li><input onChange={onChange}
					   type="checkbox"
					   id={id}
					   checked={checked}
					   class="input_check"/>
		<label for={id} class="label_check"> <i class="icon"></i><span>{label}</span></label></li>);
};

FilterCheckBox.propTypes = {
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
};

export default FilterCheckBox;