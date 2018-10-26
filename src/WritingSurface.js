import React, { Component } from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import styled from 'react-emotion';

const mapStateToProps = state => ({
  time: state.time,
  notes: state.notes,
});

const sortByTimeDesc = (note1, note2) => note2.timeStart - note1.timeStart;

const latestParentNoteByType = (notes, filter) => notes.filter(note => note.type === filter && !note.action && !note.parentId);

class WritingSurface extends Component {
  constructor(props) {
    super(props);

    this.handleKey = this.handleKey.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      timeStart: null,
      note: '',
      hasNestingSyntax: false,
    }
  }

  parentNoteId() {
    const parentNotes = Array.from(
      latestParentNoteByType(this.props.notes, this.props.noteType)
    ).sort(sortByTimeDesc);

    return parentNotes.length > 0 ? parentNotes[0].id : false;
  }

  addNote() {
    let parentNoteId = false;

    if (this.state.hasNestingSyntax && this.props.noteType) {
      parentNoteId = this.parentNoteId();
    }

    this.props.onAddedNote({
      timeStart: this.state.timeStart,
      timeEnd: this.props.time,
      note: this.state.note,
      parentNoteId: parentNoteId,
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
        autoFocus={this.props.autoFocus}
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

export default connect()(WritingSurface);

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
