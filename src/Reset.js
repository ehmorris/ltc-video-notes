import React, { Component } from 'react';

class Reset extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    window.localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <div
        onClick={this.onClick}
      >
        Clear notes and reset time
      </div>
    );
  }
}

export default Reset;
