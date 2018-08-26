import React, { Component } from 'react';

class Notes extends Component {
  render() {
    const notes = this.props.notes.map((note) =>
      <li key={note.time}>{note.time}: {note.note}</li>
    );

    return (
      <ul>
        {notes}
      </ul>
    );
  }
}

export default Notes;
