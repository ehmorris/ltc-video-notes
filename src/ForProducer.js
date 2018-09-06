import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProducerNote, addInterviewerNote } from './actions';
import WritingSurface from './WritingSurface';
import InterviewerNotes from './InterviewerNotes';
import ProducerNotes from './ProducerNotes';

const mapStateToProps = state => ({
  time: state.time,
});

class ForProducer extends Component {
  constructor(props) {
    super(props);

    this.onProducerNote = this.onProducerNote.bind(this);
    this.onInterviewerNote = this.onInterviewerNote.bind(this);
  }

  onProducerNote(note) {
    this.props.dispatch(
      addProducerNote(note.timeStart, note.timeEnd, note.note)
    );
  }

  onInterviewerNote(note) {
    this.props.dispatch(
      addInterviewerNote(note.timeStart, note.timeEnd, note.note)
    );
  }

  render() {
    return (
      <div>
        <WritingSurface
          onAddedNote={this.onInterviewerNote}
          time={this.props.time}
          label="Notes For Interviewer"
        />

        <InterviewerNotes />

        <WritingSurface
          onAddedNote={this.onProducerNote}
          time={this.props.time}
          label="Private Notes For Producer"
        />

        <ProducerNotes />
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ForProducer);
