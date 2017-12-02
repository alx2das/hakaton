import React from 'react'
import {Field} from 'redux-form/immutable'
import PropTypes from 'prop-types'

const SwitchField = ({name, switchItems}) => {
	return (<div class="switch_group">
		{switchItems.map(item => (
			<div class="switch_item" key={item.id}>
				<Field name={name} id={item.id} component="input" type="radio" value={item.value}/>
				<label for={item.id}>{item.label}</label>
			</div>)
		)}
	</div>)
};

SwitchField.propTypes = {
	switchItems: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string,
			PropTypes.number]).isRequired
	})).isRequired,
	name: PropTypes.string.isRequired
};

export default SwitchField;