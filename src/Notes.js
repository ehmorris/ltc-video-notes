import React, { Component } from 'react';

class Notes extends Component {
  render() {
    const notes = this.props.notes.map((note) =>
      <li key={note.timestamp}>{note.timestamp}: {note.value}</li>
    );

    return (
      <ul>
        {notes}
      </ul>
    );
  }
}

export default Notes;
