import React, { Component } from 'react';

class WritingSurface extends Component {
  constructor(props) {
    super(props);

    this.handleKey = this.handleKey.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      timeStart: null,
    }
  }

  addNote(note) {
    this.props.onAddedNote({
      timeStart: this.state.timeStart,
      timeEnd: this.props.time,
      note: note
    });
  }

  onChange({target: {value}}) {
    if (!value.trim()) {
      this.setState({
        timeStart: null,
      });
    }
  }

  handleKey(event) {
    const note = event.target.value.trim();

    if (!this.state.timeStart) {
      this.setState({
        timeStart: this.props.time,
      });
    }

    if (note.length > 0 && event.key === 'Enter') {
      this.addNote(note);
      event.target.value = '';
    }
  }

  render() {
    return (
      <div>
        <div>{this.props.label}</div>

        <textarea
          onKeyPress={this.handleKey}
          onChange={this.onChange}
          placeholder={this.props.label}
        ></textarea>
      </div>
    );
  }
}

export default WritingSurface;

