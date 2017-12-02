import React from 'react'
import {Route} from 'react-router'
import {Link} from 'react-router-dom'


export default ({label, to, exact}) => (
	<Route path={to} exact={exact} children={({match}) => (
		<Link className={'tab ' + (match ? 'tab__active' : '')} to={to}>{label}</Link>
	)}/>
);