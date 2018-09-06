import React, { Component } from 'react';
import Notes from './Notes';

class WritingSurface extends Component {
  constructor(props) {
    super(props);

    this.handleKey = this.handleKey.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      timeStart: null,
      note: '',
    }
  }

  addNote(note) {
    this.props.onAddedNote({
      timeStart: this.state.timeStart,
      timeEnd: this.props.time,
      note: this.state.note,
    });

    this.setState({
      note: '',
    });
  }

  onChange({target: {value}}) {
    this.setState({
      note: value,
    });

    if (!this.state.timeStart && value.trim().length) {
      this.setState({
        timeStart: this.props.time,
      });
    }

    if (!value.trim().length) {
      this.setState({
        timeStart: null,
      });
    }
  }

  handleKey(event) {
    if (
      this.state.note.trim().length > 0
      && event.key === 'Enter'
      && !event.shiftKey
    ) {
      this.addNote();
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
          value={this.state.note}
        ></textarea>

        {this.state.note.trim() &&
          <Notes
            notes={[{
              timeStart: this.state.timeStart,
              timeEnd: 'TBD',
              note: this.state.note,
            }]}
          />
        }
      </div>
    );
  }
}

export default WritingSurface;

