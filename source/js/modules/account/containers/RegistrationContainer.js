import React from 'react';
import RegistrationForm from '../components/RegistrationForm'
import {connect} from 'react-redux';
import {register, registerReset} from '../actions/accountActions'
import {bindActionCreators} from 'redux';
import {getRegistrationSection} from '../selectors/accountSelectors'
import toJs from 'components/HOC/toJs';
import {Link} from 'react-router-dom';
import ModulHeader from 'components/ModulHeader';
import {formValueSelector} from 'redux-form/immutable'
import {ContentPopupService} from 'common/uiElements';
import {push} from 'connected-react-router';
import config from 'common/helpers/clientConfig'


class RegistrationContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			captcha: config.SHOW_CAPTCHA ? null : 'false',
			captchaReady: config.SHOW_CAPTCHA ? false : true,
			formInitialValues: {agreement: true}
		};
	}

	componentDidMount() {
		this.props.registerReset();
		if (this.props.hash === 'use') {
			this.handleOpenAgreement();
		}
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

	onRegister(props) {
		if (!this.state.captcha)
			return;
		const {register} = this.props;
		const user = {
			name: props.get('name'),
			surname: props.get('surname'),
			company: props.get('company'),
			phone: props.get('phone'),
			email: props.get('email'),
			password: props.get('password'),
			captcha: this.state.captcha
		};
		register(user);
	}

	handleOpenAgreement() {
		if (this.agreementPopup) {
			this.props.push({hash: 'use'});
			this.agreementPopup.open().then(() => {
				this.props.push({hash: ''});
			});
		}
	}

	render() {
		const {loading, errors, regData, agreementSelected} = this.props;

		return (
			<div class="login reg">
				<ModulHeader/>
				<div className="login_section">
					<div className="login_section_center">
						<RegistrationForm onRegister={::this.onRegister}
										  initialValues={this.state.formInitialValues}
										  errors={errors}
										  loading={loading}
										  regData={regData}
										  agreementSelected={agreementSelected}
										  captcha={this.state.captcha}
										  captchaReady={this.state.captchaReady}
										  onCaptchaChange={::this.onCaptchaChange}
										  onCaptchaLoad={::this.onCaptchaLoad}
										  onOpenAgreement={::this.handleOpenAgreement}/>
						<div className="login_links">
							<Link to="/signin">Войти</Link>
							<Link to="/forgot">Забыли пароль?</Link>
						</div>
					</div>
					<ContentPopupService closeName="Назад" ref={p => this.agreementPopup = p}>
						<h1>Пользовательское соглашение на обработку персональных данных</h1>
						<div style={{textAlign: 'justify'}}>
							<p>В&nbsp;целях регистрации на&nbsp;сайте ООО &laquo;Аванпост&raquo;, расположенного
								по&nbsp;адресу в&nbsp;сети интернет: www.modulkassa.ru (ОГРН 1155476129753&nbsp;ИНН
								5403011237, КПП 540301001; Местонахождение: 630033, г. Новосибирск, ул. Тюменская, д.2,
								комната &#8470;&nbsp;315), а&nbsp;также в&nbsp;целях заключения Лицензионного договора
								на&nbsp;право использование программы для ЭВМ &laquo;Автоматизированное рабочее место
								кассира МодульКасса&raquo;, Клиент/Уполномоченный представитель Клиента, заполняя форму
								регистрации на&nbsp;сайте и&nbsp;передавая Персональные данные ООО
								&laquo;Аванпост&raquo;, прямо и&nbsp;однозначно заявляет следующее:</p>
							<p>2.1. Передаю ООО &laquo;Аванпост&raquo; свои Персональные данные и&nbsp;выражаю согласие
								на&nbsp;обработку с&nbsp;использованием средств автоматизации или без использования
								таких средств (включая сбор, запись, систематизацию, накопление, хранение, уточнение
								(обновление, изменение), извлечение, использование, передачу (распространение,
								предоставление, доступ), обезличивание, блокирование, удаление, уничтожение) своих
								Персональных данных, включая, но&nbsp;не&nbsp;ограничиваясь: паспортные данные, ФИО,
								место жительства, дата рождения, номер мобильного/городского телефона, иные сведения,
								а&nbsp;также осуществление любых иных действий с&nbsp;предоставляемыми Персональными
								данными с&nbsp;учетом действующего законодательства.</p>
							<p>2.2. Выражаю согласие на&nbsp;передачу ООО &laquo;Аванпост&raquo; своих Персональных
								данных для достижения целей, установленных Лицензионным договором на&nbsp;право
								использования программы для ЭВМ &laquo;Автоматизированное рабочее место кассира
								МодульКасса&raquo; (далее&nbsp;&mdash; Лицензионный договор), а&nbsp;также в&nbsp;целях
								использования личного кабинета Клиента на&nbsp;сайте ООО &laquo;Аванпост&raquo;
								www.modulkassa.ru и&nbsp;получения Клиентом услуг и&nbsp;сервисов посредством личного
								кабинета Клиента, третьим лицам (в&nbsp;том числе, Акционерному Обществу Коммерческий
								Банк &laquo;Модульбанк&raquo;, в&nbsp;случаях, когда такая передача требуется для
								достижения целей Лицензионного договора), в&nbsp;частности, при привлечении ООО
								&laquo;Аванпост&raquo; третьих лиц в&nbsp;целях надлежащего
								исполнения обязательств ООО &laquo;Аванпост&raquo; в&nbsp;рамках Лицензионного договора
								(партнеров ООО &laquo;Аванпост&raquo;) или предоставления услуг и&nbsp;сервисов при
								использовании программного обеспечения для ЭВМ &laquo;Автоматизированное рабочее место
								кассира МодульКасса&raquo; и/или личного кабинета Клиента на&nbsp;сайте
								www.modulkassa.ru, с&nbsp;предоставлением права на&nbsp;обработку передаваемых
								Персональных данных без получения дополнительного согласия на&nbsp;такую передачу.</p>
							<p>2.3. Уведомлен о&nbsp;возможности отозвать своё согласие путем направления письменного
								заявления в&nbsp;ООО &laquo;Аванпост&raquo;. Согласие считается отозванным
								по&nbsp;истечении&nbsp;30 (тридцати) календарных дней с&nbsp;момента получения Банком
								соответствующего заявления.</p>
							<p>2.4. Передавая свои Персональные данные в&nbsp;ООО &laquo;Аванпост&raquo;, настоящим даю
								согласие на&nbsp;направление мне ООО &laquo;Аванпост&raquo; извещений, уведомлений
								и&nbsp;
								иных сообщений в&nbsp;рамках Лицензионного договора посредством смс рассылки
								с&nbsp;использованием предоставленного Клиентом номера мобильного телефона, направления
								электронного сообщения по&nbsp;e-mail, предоставленного Клиентом, иных способов связи,
								информация о&nbsp;которых предоставлена Клиентом ООО &laquo;Аванпост&raquo; при
								заполнении
								и&nbsp;направлении в&nbsp;ООО &laquo;Аванпост&raquo; регистрационной формы на&nbsp;сайте
								www.modulkassa.ru.</p>
							<p>2.5. В&nbsp;тексте настоящего согласия следующие определения имеют следующие значения:
								Персональные данные&nbsp;&mdash; соответствует значению определения &laquo;Персональные
								данные&raquo;, данному в&nbsp;Федеральном законе от&nbsp;27.07.2006
								&#8470;&nbsp;152-ФЗ &laquo;О&nbsp;персональных данных&raquo; и&nbsp;включают в&nbsp;себя
								паспортные данные, ФИО, место жительства, дату рождения, номер мобильного/городского
								телефона, сведения об&nbsp;абоненте и&nbsp;оказываемых ему услугах связи
								по&nbsp;договору об&nbsp;оказании услуг связи, заключенному с&nbsp;оператором связи,
								иные сведения; третьи лица&nbsp;&mdash;&nbsp;Партнеры
								ООО &laquo;Аванпост&raquo;, с&nbsp;которыми
								у&nbsp;ООО &laquo;Аванпост&raquo;
								заключены договоры/соглашения в&nbsp;целях осуществления обслуживания Клиентов,
								сопровождения Лицензионного договора и&nbsp;в&nbsp;целях возможности предоставления
								Клиентам услуг и&nbsp;сервисов; Клиент&nbsp;&mdash; юридическое лицо или индивидуальный
								предприниматель.</p>

							<p>Условия использования программного обеспечения для ЭВМ &laquo;Автоматизированное рабочее
								место кассира МодульКасса&raquo; установлены Договором-Офертой, принимая который Клиент
								заключает с&nbsp;ООО &laquo;Аванпост&raquo; Лицензионный договор на&nbsp;право
								использование
								программы для ЭВМ &laquo;Автоматизированное рабочее место кассира
								МодульКасса&raquo;. Порядок и&nbsp;условия заключения Лицензионного договора установлены
								Договором-Офертой, размещенной на&nbsp;сайте ООО &laquo;Аванпост&raquo; по&nbsp;адресу:
								http://modulkassa.ru/help/yuridicheskie-dokumenty.php</p>
						</div>
					</ContentPopupService>
				</div>
			</div>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(RegistrationContainer));

const regForm = formValueSelector('register');

function mapStateToProps(state, ownProps) {
	const hash = (ownProps.location.hash || '').replace('#', '');
	let regSection = getRegistrationSection(state);
	return {
		hash,
		loading: regSection.get('loading'),
		errors: regSection.get('error'),
		regData: regSection.get('success'),
		agreementSelected: regForm(state, 'agreement')
	}
}

function mapDispatchToProps(dispatch) {
	return {
		push: bindActionCreators(push, dispatch),
		register: bindActionCreators(register.request, dispatch),
		registerReset: bindActionCreators(registerReset, dispatch)
	}
}