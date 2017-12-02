export default {
	beginDrag(props) {
		return {
			data: props.model
		};
	},

	canDrag({freezeMode}){
		return !freezeMode;
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if (dropResult && props.onDragEnd) {
			props.onDragEnd(item.data, dropResult);
		}
	}
};