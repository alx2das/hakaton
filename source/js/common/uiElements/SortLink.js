import React from 'react'
import PropTypes from 'prop-types';

const SortLink = ({sortField, orderBy, field, onClick, children, className = ''}) => {
	let by = (field === sortField ? (orderBy === 'asc' ? 'desc' : 'asc') : 'asc');
	className += (field === sortField ? ' icon-sort-' + (orderBy === 'asc' ? 'up' : 'down') : '');

	return <a className={className} onClick={() => onClick(field, by)}>{children}</a>
};

SortLink.propTypes = {
	sortField: PropTypes.string,
	orderBy: PropTypes.string,
	field: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func
};

export default SortLink;