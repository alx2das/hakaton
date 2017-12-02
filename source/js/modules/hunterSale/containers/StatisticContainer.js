import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'


function mapStateToProps(state, ownProps) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class extends Component {
	render() {
		console.log('fullState', this.props);
		return (
			<h1>StatisticContainer</h1>
		)

	}
}