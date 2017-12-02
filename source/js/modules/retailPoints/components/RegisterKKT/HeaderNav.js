import React, {Component, PropTypes} from 'react'


export default class HeaderNav extends Component {

	static propTypes = {
		step: PropTypes.number
	};

	static defaultProps = {
		step: 1
	};

	render() {
		const {step} = this.props;

		return (
			<div className="page_wizard">
				<div className="wizard_steps steps3">
					<div className={'step ' + (step === 1 && 'active' || 'done')}>
						<div className="label">1</div>
						<div className="name">Яндекс ОФД</div>
					</div>
					<div className={'step ' + (step === 2 && 'active' || step > 2 && 'done')}>
						<div className="label">2</div>
						<div className="name">Заявление<br />на регистрацию</div>
					</div>
					<div className={'step ' + (step === 3 ? 'active' : '')}>
						<div className="label">3</div>
						<div className="name">Отчет<br/> о регистрации</div>
					</div>
				</div>
			</div>
		)
	}

}