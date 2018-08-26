import React, { Component } from 'react';

class WritingSurface extends Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      const note = event.target.value;

      if (note.trim() !== '') {
        this.props.onAddedNote(note);
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
      </div>
    );
  }
}

export default WritingSurface;

