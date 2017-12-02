import React from 'react'
import {connect} from 'react-redux'
import toJS from 'components/HOC/toJs'
import {bindActionCreators} from 'redux'
// import {getToken} from 'modules/account/selectors/accountSelectors'
// import * as tokenCrypt from 'infrastructure/utils/tokenCrypt'

import * as actions from '../actions/accountActions'
import * as accountSelectors from '../selectors/accountSelectors'
import ChangePasswordComponent from '../components/ChangePasswordComponent'


@connect(mapStateToProps, mapDispatchToProps)
@toJS
class ChangePasswordContainer extends React.Component {

	onChangePassword(props) {
		const {changePassword} = this.props;
		changePassword({
			oldPassword: props.get('oldPassword'),
			newPassword: props.get('newPassword')
		});
	}

	render() {
		const {changePasswordState, userData } = this.props;
		// const {email} = tokenCrypt.decrypt(token); больше нет token, email записывается в state

		return (
			<div className="tab_password_change">
				<div className="form_group">
					<div className="column four property_label">Пользователь</div>
					<div className="column eight property_value">
						{userData.name} <span className="property_label">{userData.email}</span>
					</div>
				</div>

				<ChangePasswordComponent
					formState={changePasswordState}
					onChangePassword={::this.onChangePassword}/>
			</div>
		)
	}

}

function mapStateToProps(state) {
	return {
		changePasswordState: accountSelectors.getChangePasswordSection(state),
		userData: accountSelectors.getUser(state),
		// token: getToken(state)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			changePassword: actions.changePassword.request
		}, dispatch)
	}
}


export default ChangePasswordContainer;