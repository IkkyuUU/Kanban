import React from 'react';
import connect from '../libs/connect';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import LaneHeader from './LaneHeader';

//Drag and Drop for empty lane
import {compose} from 'redux';
import {DropTarget} from 'react-dnd';
import ItemType from '../constant/itemType';

const Lane = ({
	lane, notes, LaneActions, NoteActions, connectDropTarget, ...props
}) => {
	const editNote = (id, task) => {
		NoteActions.update({id, task, editing: false});
	};

	const deleteNote = (noteId, e) => {
		e.stopPropagation();

		LaneActions.detachFromLane({
			laneId: lane.id,
			noteId
		});
		NoteActions.delete(noteId);
	};

	const activateNoteEdit = id => {
		NoteActions.update({id, editing: true});
	};

	return connectDropTarget(
		<div {...props}>
			<LaneHeader lane={lane}/>
			<Notes
				notes={selectNotesByIds(notes, lane.notes)}
				onNoteClick={activateNoteEdit}
				onEdit={editNote}
				onDelete={deleteNote} />
		</div>
	);
};

function selectNotesByIds(allNotes, noteIds = []) {
	// `reduce` is a powerful method that allows us to
	// fold data. You can implement `filter` and `map`
	// through it. Here we are using it to concatenate
	// notes matching to the ids.
	return noteIds.reduce((notes, id) =>
	// Concatenate possible matching ids to the result
		notes.concat(
			allNotes.filter(note => note.id === id)
		)
		, []
	);
}

const noteTarget = {
	hover(targetProps, monitor) {
		const sourceProps = monitor.getItem();
		const sourceId = sourceProps.id;
		// If the target lane doesn't have notes,
		// attach the note to it.
		//
		// `attachToLane` performs necessarly
		// cleanup by default and it guarantees
		// a note can belong only to a single lane
		// at a time.
		if(!targetProps.lane.notes.length) {
			LaneActions.attachToLane({
				laneId: targetProps.lane.id,
				noteId: sourceId
			});
		}
	}
};

// export default connect(
// 	({notes}) => ({
// 		notes
// 	}), {
// 		NoteActions,
// 		LaneActions
// 	}
// )(Lane);

export default compose(
	DropTarget(ItemType.NOTE, noteTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	connect(
		({notes}) => ({notes}),
		{NoteActions, LaneActions}
	)
)(Lane);