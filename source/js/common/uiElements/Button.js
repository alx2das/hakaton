import React from 'react'
import PropTypes from 'prop-types';

const Button = ({loading, className, disabled, type, ...props}) => {
	const buttonType = type || 'button';
	return (
		<button type={buttonType}
				disabled={loading || disabled}
				className={[className || '', loading ? 'loader' : ''].join(' ')}
				{...props}>{props.children}</button>
	)
};

Button.propTypes = {
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.string,
	onClick: PropTypes.func
};


export default Button;

