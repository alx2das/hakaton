import React from 'react'
import PropTypes from 'prop-types'
import KeyShape from '../KeyShape'
import BoxSource from './BoxSource'
import {DragSource} from 'react-dnd';


@DragSource('box', BoxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
}))
class HotKeyProduct extends React.Component {
	render() {
		const {model, onSelectProduct, className, freezeMode}=this.props;
		const {connectDragSource, connectDragPreview, isDragging}=this.props;
		const classNames = [className, isDragging ? 'hidden' : ''].join(' ');
		return connectDragPreview(
			<div className={classNames} style={{zIndex: 3}}>
				<div onClick={event => onSelectProduct(event, model.id)}
					 style={{backgroundColor: model.color}}
					 className="cell">
					{!freezeMode && connectDragSource(<span class="cell_move icon-move"></span>)}
					{model.name}
				</div>
			</div>
		);
	};
}

HotKeyProduct.propTypes = {
	model: KeyShape.isRequired,
	onSelectProduct: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	onDragEnd: PropTypes.func,
	freezeMode: PropTypes.bool
};

export default HotKeyProduct;

