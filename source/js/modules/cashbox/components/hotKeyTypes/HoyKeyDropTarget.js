import React from 'react'
import PropTypes from 'prop-types'
import * as hotKeyHelper from '../../helpers/hotKeyHelper'
import {DropTarget} from 'react-dnd';
import GridValidator from '../../helpers/GridValidator'

const boxTarget = {
	drop({model}) {
		return {model};
	},
	canDrop({keys, gridSize, model}, monitor){
		const item = monitor.getItem();
		if (item && keys && gridSize && model) {
			const {data:sourceModel}=item;

			const validator = new GridValidator(gridSize.width, gridSize.height);
			const otherKeys = keys.filter(s => s.id !== sourceModel.id);
			const sourceKey = keys.find(s => s.id === sourceModel.id);
			const newKey = {...sourceKey, row: model.row, col: model.col};
			const isValid = validator.isValidCord(newKey);
			const isNotIntersect = isValid && !validator.intersect(newKey, otherKeys);
			return isValid && isNotIntersect;
		}
		return true
	}
};

@DropTarget('box', boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
	item: monitor.getItem(),
}))
class HoyKeyDropTarget extends React.Component {
	render() {
		const {connectDropTarget, canDrop, isOver, item, className = '', model, onSelectEmptyKey}=this.props;
		const isActive = canDrop && isOver;

		let hoverClass = '';
		if (isActive && item && item.data) {
			hoverClass = hotKeyHelper.generateWrapperClass(null, null, item.data.width, item.data.height);
			hoverClass += ' paste_to';
		}

		const style = isActive ? {} : {background: 'transparent'};

		const classNames = [className, hoverClass].join(' ');

		return connectDropTarget(<div className={classNames} style={{zIndex: 2}}>
			<div className="cell" style={style}
				 onClick={event => onSelectEmptyKey(event, model)}>
			</div>
		</div>);
	};
}

HoyKeyDropTarget.propTypes = {
	model: PropTypes.shape({
		row: PropTypes.number.isRequired,
		col: PropTypes.number.isRequired
	}).isRequired,
	onSelectEmptyKey: PropTypes.func.isRequired
};

export default HoyKeyDropTarget;


