import React from 'react'
import PropTypes from 'prop-types';
import Button from './Button';

const PrimaryButton = ({children, ...props}) => {
	return (<Button className='button middle wide' {...props}>{children}</Button>);
};

PrimaryButton.propTypes = {
	loading: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool
};


export default PrimaryButton;

