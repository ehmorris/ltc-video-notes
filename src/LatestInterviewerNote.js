import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

const mapStateToProps = state => ({
  latestNote: state.notes.filter(note => note.type === 'interviewer').reverse(),
});

class LatestInterviewerNote extends Component {
  render() {
    return (
      <div>
        {this.props.latestNote.length > 0 && !this.props.latestNote.action &&
          <Text>{this.props.latestNote[0].note}</Text>
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
