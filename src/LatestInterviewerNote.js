import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  latestNote: state.notes.filter(note => note.type === 'interviewer').reverse()[0],
});

class LatestInterviewerNote extends Component {
  render() {
    return (
      <div>{this.props.latestNote.note}</div>
    );
  }
}

export default connect(
  mapStateToProps
)(LatestInterviewerNote);
