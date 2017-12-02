import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'

import NotFoundLayout from 'components/NotFoundLayout'
import InternalLayout from 'components/InternalLayout'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import RadRouter from 'components/RadRouter/RadRouter'
import {NotifyService} from 'common/uiElements/Notify/immutable'
import {LoaderPanel} from 'common/uiElements'
import {getAppReady} from 'modules/account/selectors/accountSelectors'


class HomeApp extends React.Component {
	render() {
		return (
			<h1>Hello App</h1>
		)
	}
}


@withRouter
class AppContainer extends React.Component {
	static propTypes = {
		routes: PropTypes.array.isRequired
	};

	componentDidMount() {
		$('#root').removeClass('loading_block');
	}

	render() {
		const {routes} = this.props;


		return (
			<HomeApp />
		);
	}
}

export default AppContainer;