import React, {Component, PropTypes} from 'react'
import * as enums from '../../enums/registerKKTEnums'
import { Button } from 'common/uiElements'

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}
	static propTypes = {
		generateCode: PropTypes.func.isRequired,
		loading: PropTypes.bool,
		statuses: PropTypes.shape({
			kktStatus: PropTypes.string.isRequired,
			registrationRequestStatus: PropTypes.string.isRequired
		})
	};

	onHide = () => {
		this.setState({
			show: !this.state.show
		});
	};

	render() {
		const {generateCode, statuses, point, loading} = this.props;
		const statusKassa = enums.getKassaStatus(statuses);

		return (
			<div className={'status_block_drop  status_pos ' + (!this.state.show ? 'minified ' : '') + (statusKassa ? 'active' : 'inactive')}>
				<div onClick={this.onHide} className="header">
					<a className="block_expand icon-up-big"/>
				</div>
				{this.state.show &&
				<div className="body">
					{!statusKassa &&
					<div>
						{point.posLinkToken &&
						<div>
							<div className="description">Для активации точки укажите код на кассе</div>
							<div className="activation_code">{point.posLinkToken}</div>
						</div>}
						{!point.posLinkToken &&
						<div>
							<div className="description">Для активации точки укажите код на кассе</div>
							<Button className='button middle' onClick={generateCode} loading={loading}>
								Сгенерировать код
							</Button>
						</div>}
					</div>}

					{statusKassa &&
					<div>
						<div className="description">
							Теперь касса работает с точкой продаж! Активируйте точку продаж заново, если:<br />
							&mdash; удалили и переустановили МодульКассу.<br />
							&mdash; переносите точку продаж на другую кассу.<br /><br />
							Внимание! Перед привязкой точки проверьте очередь на отправку в личный кабинет МодульКассы. Если касса не отправила чеки, они будут утеряны.
						</div>
						{point.posLinkToken && <div className="activation_code">{point.posLinkToken}</div>}
						{!point.posLinkToken &&
						<Button className='button middle'
								onClick={generateCode}
								loading={loading}>
							Новый код активации
						</Button>}
					</div>}
				</div>
				}
			</div>
		)
	}
}
