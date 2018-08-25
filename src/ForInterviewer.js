import React, { Component } from 'react';
import Clock from './Clock';

class ForInterviewer extends Component {
  render() {
    const notes = this.props.notesForInterviewer.map((note) =>
      <div key={note.timestamp}>{note.value}</div>
    );

    return (
      <div>
        <Clock time={this.props.time} />

        <ul>
          {notes[notes.length - 1]}
        </ul>
      </div>
    );
  }
}

export default ForInterviewer;
