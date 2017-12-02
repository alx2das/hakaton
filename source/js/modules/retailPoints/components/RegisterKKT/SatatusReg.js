import React, {Component, PropTypes} from 'react'
import * as enums from '../../enums/registerKKTEnums'


export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:  enums.SHOW_STATUS_REG_BLOCK_WITH.includes(props.statuses.registrationRequestStatus)
		}
	}
	static propTypes = {
		onOpenLayerRegKKT: PropTypes.func.isRequired,
		retailPointID: PropTypes.string,
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
		const {onOpenLayerRegKKT, statuses, retailPointID, point: {errorKKT}, actSendReport} = this.props;
		const LK_STATUS = enums.getLkStatus(statuses);
		const actClickBtn = () => {
			if (statuses.registrationRequestStatus === enums.SERVER_STATUS.REPORT_PRINT_ERROR) {
				actSendReport({retailPointID, isPush: true});
			}
			else onOpenLayerRegKKT();
		};

		return (
			<div className={'status_block_drop status_reg ' + LK_STATUS.cssClass + (!this.state.show ? ' minified' : '')}>
				<div onClick={this.onHide} className="header">
					<span>{LK_STATUS.status}</span>
					<a className="block_expand icon-up-big"/>
				</div>
				<div className="body">
					{LK_STATUS.head && <div>{LK_STATUS.head}</div>}
					{LK_STATUS.description && <div className='description' dangerouslySetInnerHTML={{__html: LK_STATUS.description}} />}
					{errorKKT.doc && LK_STATUS.action && <div className='description' dangerouslySetInnerHTML={{__html: LK_STATUS.action(retailPointID)}} />}
					{errorKKT.mess && <div className='description' dangerouslySetInnerHTML={{__html: errorKKT.mess}} />}
					{LK_STATUS.button && <a className='button middle' onClick={actClickBtn}>{LK_STATUS.button}</a>}
				</div>
			</div>
		)
	}
}
