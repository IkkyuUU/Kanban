import uuid from 'uuid';

import NoteActions from '../actions/NoteActions';

/*
Connecting NoteActions with NoteStore
Alt provides a couple of convenient ways to connect actions to a store:
1. this.bindAction(NoteActions.CREATE, this.create) - Bind a specific action to a specific method.
2. this.bindActions(NoteActions)- Bind all actions to methods by convention. 
   I.e., create action would map to a method named create.
3. reduce(state, { action, data }) - It is possible to implement a custom method known as reduce. 
   This mimics the way Redux reducers work. The idea is that you'll return a new state based on the 
   given state and payload.
*/

export default class NoteStore {
  constructor() {

    this.bindActions(NoteActions);

    this.notes = [];
  }

  create(note) {
    console.log('create note', note);

    this.setState({
      notes: this.notes.concat(note)
    });
  }
  update(updateNote) {
    console.log('update note', updateNote);

    this.setState({
      notes: this.notes.map(note => {
        if (note.id === updateNote.id) {
          return Object.assign({}, note, updateNote);
        }

        return note;
      })
    });
  }
  delete(id) {
    console.log('delete note', id);

    this.setState({
      notes: this.notes.filter(note => note.id !== id)
    });
  }
}