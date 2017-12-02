import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import NotFoundLayout from 'components/NotFoundLayout';
import InternalLayout from 'components/InternalLayout';
import DefaultLayerLayout from 'components/DefaultLayerLayout';
import RadRouter from 'components/RadRouter/RadRouter';
import {NotifyService} from 'common/uiElements/Notify/immutable';
import {LoaderPanel} from 'common/uiElements';
import {getAppReady} from 'modules/account/selectors/accountSelectors';
import logger from 'infrastructure/utils/logger';
import IntercomChat from 'components/IntercomChat';
import NotificationKKT from 'modules/retailPoints/containers/NotificationKKT'

@withRouter
@connect((state) => ({
	appReady: getAppReady(state)
}))
class AppContainer extends React.Component {
	static propTypes = {
		appReady: PropTypes.bool.isRequired,
		routes: PropTypes.array.isRequired
	};

	componentDidMount() {
		$('#root').removeClass('loading_block');
	}

	componentWillUnmount() {
		logger.log('AppContainer componentWillUnmount');
	}

	render() {
		const {appReady, routes} = this.props;



		return (
			<LoaderPanel loading={!appReady}>
				{appReady &&
				<RadRouter defaultLayerLayout={DefaultLayerLayout}
						   defaultLayout={InternalLayout}
						   routes={routes}
						   notFound={NotFoundLayout}/>}
				<NotifyService />
				<NotificationKKT />
				<IntercomChat appID="sxetym38" />
			</LoaderPanel>
		);
	}
}

export default AppContainer;