import React from 'react';
import Note from './Note';
import Editable from './Editable';
import LaneActions from '../actions/LaneActions';

export default ({
	notes, 
	onDelete=() => {}, onEdit=() => {}, onNoteClick=() => {}
}) => (
	<ul className="notes">{
		notes.map(({id, editing, task}) => 
			<li key={id}>
				<Note className="note" onClick={onNoteClick.bind(null, id)} id={id} 
					editing={editing}
					onMove={LaneActions.move}>
					<Editable className="editable" editing={editing} value={task} onEdit={onEdit.bind(null, id)}/>
					<button className="delete" onClick={onDelete.bind(null, id)}> X </button>
				</Note>
			</li>
		)
	}</ul>
)