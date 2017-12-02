import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const style = {
	height: '20px',
	width: '20px',
	marginRight: '5px',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '5px',
	lineHeight: 'normal',
	float: 'left',
};

const boxTarget = {
	drop() {
		return { name: 'Dustbin' };
	},
};

@DropTarget('box', boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))
export default class Dustbin extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	};

	render() {
		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;

		let backgroundColor = '#222';
		if (isActive) {
			backgroundColor = 'darkgreen';
		} else if (canDrop) {
			backgroundColor = 'darkkhaki';
		}

		return connectDropTarget(
			<div style={{ ...style, backgroundColor }}>
				{isActive ?
					'Release to drop' :
					'Drag a box here'
				}
			</div>,
		);
	}
}
