import React from 'react'
import PropTypes from 'prop-types';
const Loader = ({loading}) => (loading ? <div className="loading_block" style={{height: '100%'}}></div> : null);

Loader.propTypes = {
	loading: PropTypes.bool
};
export default Loader;