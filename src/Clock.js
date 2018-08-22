import React, { Component } from 'react';

class Clock extends Component {
  render() {
    return (
      <div>
        {this.props.time}
      </div>
    );
  }
}

export default Clock;
