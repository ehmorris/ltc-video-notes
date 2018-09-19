import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import styled from 'react-emotion';

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
      timeStart: null,
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
      <MinimalTextarea
        onKeyPress={this.handleKey}
        onChange={this.onChange}
        placeholder={this.props.label}
        value={this.state.note}
        minRows={1}
        maxRows={10}
      />
    );
  }
}

export default WritingSurface;

const MinimalTextarea = styled(Textarea)`
  -webkit-appearance: none;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  display: block;
  padding: 0;
  margin: 0;
  background: none;
  resize: none;
  outline: none;
  color: inherit;
  border: none;
`;
