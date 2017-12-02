import React from 'react'
import DefaultLayerLayout from 'components/DefaultLayerLayout'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'

import ChangePasswordContainer from './ChangePasswordContainer'
import ServiceContainer from './ServiceContainer'


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class SettingsContainer extends DefaultLayerLayout {

	componentDidMount() {
		super.openLayer();
		const {tab} = this.props;
		this.setState({tab: tab || 'changepassword'});
	}

	componentWillReceiveProps(props) {
		const {tab} = props;
		tab && this.setState({tab: tab});
	}

	render() {
		const {tab: activeTab} = this.state || {};

		const changeTabPassword = activeTab == 'changepassword';
		const changeTabMoySklad = activeTab == 'services';

		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>Настройки</h1>
				</div>
				<div className="page_content page_content__settings">
					<div className="tabs tabs_vertical">
						<div className="tabs_menu">
							<ul>
								<li className={changeTabPassword ? 'active' : ''}>
									<Link to={{pathname: '/settings', hash: '#changepassword'}}>Смена пароля</Link>
								</li>
								<li className={changeTabMoySklad ? 'active' : ''}>
									<Link to={{pathname: '/settings', hash: '#services'}}>Сервисы</Link>
								</li>
							</ul>
						</div>

						<div className="tabs_content">
							{changeTabPassword && <ChangePasswordContainer/>}
							{changeTabMoySklad && <ServiceContainer/>}
						</div>
					</div>
				</div>
			</article>
		);
	}

}

SettingsContainer.propTypes = {
	tab: PropTypes.string
};


function mapStateToProps(state, ownProps) {
	return {
		tab: (ownProps.location.hash || '').replace('#', '')
	}
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({}, dispatch)
	}
}


export default SettingsContainer;