import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

const mapStateToProps = state => ({
  latestNotes: state.notes.filter(note => note.type === 'interviewer').reverse(),
});

class LatestInterviewerNote extends Component {
  render() {
    if (this.props.latestNotes.length && !this.props.latestNotes[0].action) {
      return <Text>{this.props.latestNotes[0].note}</Text>;
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps
)(LatestInterviewerNote);

const Text = styled('div')`
  white-space: pre-wrap;
`;
