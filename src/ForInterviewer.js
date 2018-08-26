import React, { Component } from 'react';
import Clock from './Clock';
import Notes from './Notes';

class ForInterviewer extends Component {
  render() {
    return (
      <div>
        <Clock time={this.props.time} />
        <Notes notes={this.props.notesForInterviewer} />
      </div>
    );
  }
}

export default ForInterviewer;
