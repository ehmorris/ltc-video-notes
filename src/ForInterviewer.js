import React, { Component } from 'react';
import Clock from './Clock';
import InterviewerNotes from './InterviewerNotes';

class ForInterviewer extends Component {
  render() {
    return (
      <div>
        <Clock time={this.props.time} />
        <InterviewerNotes />
      </div>
    );
  }
}

export default ForInterviewer;
