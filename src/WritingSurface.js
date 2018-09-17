import React, { Component } from 'react';

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

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
    }
  }

  render() {
    return (
      <div>
        <textarea
          onKeyPress={this.handleKey}
          onChange={this.onChange}
          placeholder={this.props.label}
          value={this.state.note}
          style={{
            width: '100%',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            WebkitAppearance: 'none',
            display: 'block',
            padding: '48px',
            margin: '0',
            background: 'none',
            resize: 'none',
            outline: 'none',
            color: 'inherit',
            border: 'none',
          }}
        ></textarea>

        {this.state.startTime &&
          <span>{this.state.startTime}</span>
        }
      </div>
    );
  }
}

export default WritingSurface;

