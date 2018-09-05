import React, { Component } from 'react';
import Clock from './Clock';
import InterviewerNotes from './InterviewerNotes';

class ForInterviewer extends Component {
  render() {
    return (
      <div>
        <Clock />
        <InterviewerNotes />
      </div>
    );
  }
}

export default ForInterviewer;
