import React, { Component } from 'react';
import ClockContainer from './Clock';
import InterviewerNotes from './InterviewerNotes';

class ForInterviewer extends Component {
  render() {
    return (
      <div>
        <ClockContainer />
        <InterviewerNotes />
      </div>
    );
  }
}

export default ForInterviewer;
