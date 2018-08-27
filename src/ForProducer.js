import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProducerNote, addInterviewerNote } from './actions';
import WritingSurface from './WritingSurface';
import InterviewerNotes from './InterviewerNotes';
import ProducerNotes from './ProducerNotes';
import ClockContainer from './Clock';

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
      addProducerNote(this.props.time, note)
    );
  }

  onInterviewerNote(note) {
    this.props.dispatch(
      addInterviewerNote(this.props.time, note)
    );
  }

  render() {
    return (
      <div>
        <ClockContainer />

        <WritingSurface
          onAddedNote={this.onInterviewerNote}
          label="Notes For Interviewer"
        />

        <InterviewerNotes />

        <WritingSurface
          onAddedNote={this.onProducerNote}
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
