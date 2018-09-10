import React, { Component } from 'react';
import BigClock from './BigClock';
import InterviewerNotes from './InterviewerNotes';

class ForInterviewer extends Component {
  render() {
    return (
      <div>
        <BigClock />
        <InterviewerNotes />
      </div>
    );
  }
}

export default ForInterviewer;
