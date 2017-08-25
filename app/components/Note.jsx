import React from 'react';

//Drag and Drop
import {compose} from 'redux';
import {DragSource, DropTarget} from 'react-dnd';
import ItemType from '../constant/itemType';

const Note = ({
	connectDragSource, connectDropTarget, 
	isDragging, isOver, editing, 
	onMove, id, children, ...props
}) => {
	//if editing, forbid moving
	const dragSource = editing ? a => a : connectDragSource;

	return compose(dragSource, connectDropTarget)(
		<div style={{opacity: isDragging || isOver ? 0 : 1}} {...props}>
			{children}
		</div>
	);
};

const noteSource = {
	beginDrag(props) {
		return {
			id: props.id
		};
	}
};

const noteTarget = {
	hover(targetProps, monitor) {
		const targetId = targetProps.id;
		const sourceProps = monitor.getItem();
		const sourceId = sourceProps.id;

		if(sourceId !== targetId) {
			targetProps.onMove({sourceId, targetId});
		}
	}
};

export default compose(
	DragSource(ItemType.NOTE, noteSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	})),
	DropTarget(ItemType.NOTE, noteTarget, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	}))
)(Note);