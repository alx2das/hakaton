import React from 'react'
import PropTypes from 'prop-types'
import KeyShape from '../KeyShape';
import BoxSource from './BoxSource'
import {DragSource} from 'react-dnd';

@DragSource('box', BoxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
}))
class HotKeyCategory extends React.Component {
	render() {
		const {className, model, onSelectProduct, onOpenCategory, freezeMode}=this.props;
		const {connectDragSource, connectDragPreview, isDragging}=this.props;
		const classNames = [className, isDragging ? 'hidden' : ''].join(' ');
		return connectDragPreview(
			<div className={classNames} style={{zIndex: 3}}>
				<div className="cell  category"
					 style={{backgroundColor: model.color}}
					 onClick={event => onSelectProduct(event, model.id)}>
					{!freezeMode && connectDragSource(<span class="cell_move icon-move"></span>)}
					{model.name}
					<a className="category_open"
					   onClick={e => onOpenCategory(e, {
						   categoryId: model.groupcode,
						   tabCode: model.tabCode
					   })}>открыть</a>
				</div>
			</div>
		);
	}
}

HotKeyCategory.propTypes = {
	model: KeyShape.isRequired,
	onSelectProduct: PropTypes.func.isRequired,
	onOpenCategory: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	onDragEnd: PropTypes.func
};

export default HotKeyCategory;

