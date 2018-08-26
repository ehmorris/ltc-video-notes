import React, { Component } from 'react';
import Notes from './Notes';

class WritingSurface extends Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      notes: [],
    }
  }

  addNote(newNote) {
    const notes = this.state.notes;

    notes.push({
      timestamp: this.props.time,
      value: newNote,
    });

    this.setState({
      notes: notes,
    });

    if (this.props.onNotesForInterviewerUpdate) {
      this.props.onNotesForInterviewerUpdate(notes);
    }
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      const note = event.target.value;

      if (note.trim() !== '') {
        this.addNote(note);
      }

      event.target.value = '';
    }
  }

  render() {
    return (
      <div>
        <div>{this.props.label}</div>

        <textarea
          onKeyDown={this.onKeyDown}
          placeholder={this.props.label}
        ></textarea>

        <Notes notes={this.state.notes} />
      </div>
    );
  }
}

export default WritingSurface;

