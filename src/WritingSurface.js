import React, { Component } from 'react';

class WritingSurface extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      notes: [],
    }
  }

  onChange({target: {value}}) {
    const newNotes = this.state.notes;

    newNotes.push({
      timestamp: this.props.time,
      value: value,
    });

    this.setState({
      notes: newNotes,
    });
  }

  render() {
    const notes = this.state.notes.map((note) =>
      <li>{note.timestamp}: {note.value}</li>
    );

    return (
      <div>
        <textarea
          onChange={this.onChange}
        ></textarea>

        <ul>
          {notes}
        </ul>
      </div>
    );
  }
}

export default WritingSurface;

