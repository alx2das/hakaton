import React from 'react';
import ForgotForm from '../components/ForgotForm'
import {connect} from 'react-redux';
import {forgot, forgotReset} from '../actions/accountActions'
import {bindActionCreators} from 'redux';
import {getForgotSection} from '../selectors/accountSelectors'
import toJs from 'components/HOC/toJs';
import {Link} from 'react-router-dom';
import ModulHeader from 'components/ModulHeader';
import config from 'common/helpers/clientConfig'


class ForgotContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			captcha: config.SHOW_CAPTCHA ? null : 'false',
			captchaReady: config.SHOW_CAPTCHA ? false : true
		};
	}

	handleSendEmail(form) {
		this.props.sendMail(form.get('email'), this.state.captcha);
	}

	componentWillUnmount() {
		this.props.resetForm();
	}

	onCaptchaChange(value) {
		this.setState({
			captcha: value
		});
	}

	onCaptchaLoad() {
		this.setState({
			captchaReady: true
		});
	}

	render() {
		const {loading, success, errors}=this.props;

		return (
			<div class="login forgot">
				<ModulHeader/>
				<div className="login_section">
					<div className="login_section_center">
						<ForgotForm onSendEmail={::this.handleSendEmail}
									loading={loading}
									isSent={success}
									errors={errors}

									captcha={this.state.captcha}
									captchaReady={this.state.captchaReady}
									onCaptchaChange={::this.onCaptchaChange}
									onCaptchaLoad={::this.onCaptchaLoad}
						/>
						<div className="login_links">
							<Link to="/signin">Войти</Link>
							<Link to="/registration">Зарегистрироваться</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
;

export default connect(mapStateToProps, mapDispatchToProps)(toJs(ForgotContainer));


function mapStateToProps(state, ownProps) {
	const forgotState = getForgotSection(state);
	return {
		loading: forgotState.get('loading'),
		errors: forgotState.get('error'),
		success: forgotState.get('success')
	}
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			sendMail: forgot.request,
			resetForm: forgotReset
		}, dispatch)
	}
}