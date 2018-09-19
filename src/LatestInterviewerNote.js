import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

const mapStateToProps = state => ({
  latestNotes: state.notes.filter(note => note.type === 'interviewer').reverse(),
});

class LatestInterviewerNote extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.latestNotes.length > 0 && prevProps.latestNotes.length > 0 && this.props.onNoteUpdate) {
      if (this.props.latestNotes[0].action) {
        this.props.onNoteUpdate(0);
      }

      else if (prevProps.latestNotes[0].note.length !== this.props.latestNotes[0].note.length) {
        this.props.onNoteUpdate(this.props.latestNotes[0].note.length);
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.latestNotes.length > 0 && !this.props.latestNotes.action &&
          <Text>{this.props.latestNotes[0].note}</Text>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(LatestInterviewerNote);

const Text = styled('div')`
  white-space: pre-wrap;
`;
