import React from 'react'
import PropTypes from 'prop-types';

const LoaderPanel = ({loading, children, className = '', style}) => {
	style = loading ? style : {};
	const classNames = [className, loading ? 'loading_block' : ''].join(' ');
	return (<div className={classNames} style={style}>{children}</div>)
};

LoaderPanel.defaultProps = {
	className: 'poss'
};


LoaderPanel.propTypes = {
	loading: PropTypes.bool,
	className: PropTypes.string,
	style: PropTypes.object
};
export default LoaderPanel;