import React, { Component } from 'react';
import WritingSurface from './WritingSurface';

class ForProducer extends Component {
  render() {
    return (
      <div>
        <WritingSurface
          time={this.props.time}
          onNotesForInterviewerUpdate={this.props.onNotesForInterviewerUpdate}
          label="Notes For Interviewer"
        />

        <WritingSurface
          time={this.props.time}
          label="Private Notes For Producer"
        />
      </div>
    );
  }
}

export default ForProducer;
