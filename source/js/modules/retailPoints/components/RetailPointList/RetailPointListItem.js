import React from 'react'
import RetailPointShape from '../RetailPointShape';
import {string, func} from 'prop-types';
import * as enums from '../../enums/registerKKTEnums'


const RetailPointListItem = ({point, selectedPointId, onSelectPoint, onItemClick, onActionRegKKT, actSendReport}) => {
	const LK_STATUS = enums.getLkStatus(point);
	const actClickBtn = () => {
		if (point.registrationRequestStatus === enums.SERVER_STATUS.REPORT_PRINT_ERROR) {
			actSendReport({retailPointID: point.id, isPush: true});
		}
		else onActionRegKKT(point.id);
	};

	return (
		<div className='table_row  row_link'>
			<div className='pos_name' onClick={(e) => onItemClick(point.id)}>
				{point.name}
				<div className='pos_address'>{point.address}</div>
			</div>
			<div className={`pos_status_kkt_reg ${LK_STATUS.cssClass || ''}`}
				 onClick={(e) => onItemClick(point.id)}>
				{LK_STATUS.status}
			</div>
			<div className='pos_action'>
				{LK_STATUS.button && <a
					onClick={actClickBtn}
					className='button xsmall second'>{LK_STATUS.button}</a>}
			</div>
			<div className='pos_current'>
				<input type="checkbox" name={point.id} id={point.id}
					   checked={selectedPointId === point.id}
					   onChange={() => onSelectPoint(point.id)}/>
				<label htmlFor={point.id} className="label_check switcher small">
					<i className="icon"/>
					<span>Текущая</span>
				</label>
			</div>
		</div>
	);
};

RetailPointListItem.propTypes = {
	point: RetailPointShape.isRequired,
	selectedPointId: string,
	onSelectPoint: func.isRequired,
	onItemClick: func
};

export default RetailPointListItem;