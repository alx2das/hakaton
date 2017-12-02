import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {getAuthData} from 'modules/account/selectors/accountSelectors'
import {LoaderPanel} from 'common/uiElements'

export default (RouteComponent) => {

	// @connect(mapStateToProps)
	class PrivateRoute extends React.Component {
		render() {
			const {...props}=this.props;

			return (
				<RouteComponent
					{...props}
				/>
			);
		}
	}

	return PrivateRoute;
};

function mapStateToProps(state) {
	return {
		authData: getAuthData(state)
	}
}