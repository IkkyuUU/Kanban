import React from 'react';

//We dont have back end, so we'll use a standard known as RFC4122 instead.
//We'll be using a Node.js implementation known as uuid and its uuid.v4 variant. 
//It will give us ids, such as 1c8e7a12-0b4c-4f23-938c-00d7161f94fc and they are 
//guaranteed to be unique with a very high probability.
import uuid from 'uuid';

import connect from '../libs/connect';

import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';

//Drag and Drop
import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
 
//Should be moved to Lane logic
// class App extends React.Component {

// 	render() {
// 		const {notes} = this.props;

// 		return (
// 			<div>
// 				<button className="add-note" onClick={this.addNote}> + </button>
// 				<Notes 
// 					notes={notes} 
// 					onDelete={this.deleteNode}
// 					onEdit={this.editNote}
// 					onNoteClick={this.activateNoteEdit}
// 				/>
// 			</div>
// 		);
// 	}

// 	//Arrow Function will bind this to addNote automatically
// 	addNote = () => {
// 		this.props.NoteActions.create({
// 			id: uuid.v4(),
// 			task: 'new task'
// 		});
// 	}

// 	deleteNode = (id, e) => {
// 		// Avoid bubbling to edit
// 		e.stopPropagation();

// 		this.props.NoteActions.delete(id);
// 	}

// 	activateNoteEdit = (id) => {
// 		this.props.NoteActions.update({id, editing: true});
// 	}

// 	editNote = (id, task) => {
// 		this.props.NoteActions.update({id, task, editing: false});
// 	}
// }

const App = ({LaneActions, lanes}) => {
	const addLane = () => {
		LaneActions.create({
			id: uuid.v4(),
			name: 'New Lane'
		});
	};

	return (
		<div>
			<button className="add-lane" onClick={addLane}>+</button>
			<Lanes lanes={lanes} />
		</div>
	);
};

//Connect store and actions to App.jsx
//This gives us this.props.NoteActions.create kind of API for triggering various actions.
// export default connect(({lanes}) => ({
// 	lanes
// }), {
// 	LaneActions
// })(App);

export default compose(
	DragDropContext(HTML5Backend),
	connect(
		({lanes}) => ({lanes}),
		{LaneActions}
	)
)(App);