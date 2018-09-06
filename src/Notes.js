import React, { Component } from 'react';

class Notes extends Component {
  render() {
    const notes = this.props.notes.map((note) =>
      <li key={note.timeEnd}>
        <div>Start: {note.timeStart}</div>
        <div>End: {note.timeEnd}</div>
        <div>Note: <pre>{note.note}</pre></div>
      </li>
    );

    return (
      <ul>
        {notes}
      </ul>
    );
  }
}

export default Notes;
