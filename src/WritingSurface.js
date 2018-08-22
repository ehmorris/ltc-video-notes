import React, { Component } from 'react';

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
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      const note = event.target.value;
      this.addNote(note);
      event.target.value = '';
    }
  }

  render() {
    const notes = this.state.notes.map((note) =>
      <li key={note.timestamp}>{note.timestamp}: {note.value}</li>
    );

    return (
      <div>
        <div>{this.props.label}</div>

        <textarea
          onKeyDown={this.onKeyDown}
          placeholder={this.props.label}
        ></textarea>

        <ul>
          {notes}
        </ul>
      </div>
    );
  }
}

export default WritingSurface;

