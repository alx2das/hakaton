import React from 'react';
import {arrayOf, string, func} from 'prop-types';
import RetailPointShape from '../RetailPointShape';

import RetailPointListItem from './RetailPointListItem'

class RetailPointList extends React.Component {
	static propTypes = {
		points: arrayOf(RetailPointShape),
		selectedPointId: string,
		onSelectPoint: func,
		onItemClick: func
	};

	render() {
		const {points = [], selectedPointId, onSelectPoint, onItemClick, onActionRegKKT, actSendReport} = this.props;
		return (
			<div className='widget_block'>
				<div className='table table_pos'>
					<div className='table_head'>
						<div className='pos_name'>Название</div>
						<div className="pos_status_kkt_reg">Статус кассы</div>
						<div className="pos_action"/>
						<div className="pos_current">Действия</div>
					</div>
					{points.map(point => (
						<RetailPointListItem
							key={point.id}
							point={point}
							actSendReport={actSendReport}
							onActionRegKKT={onActionRegKKT}
							selectedPointId={selectedPointId}
							onSelectPoint={onSelectPoint}
							onItemClick={onItemClick}
						/>))}
				</div>
			</div>
		);
	}
}

export default RetailPointList;
