import React, { Component } from 'react';

class Reset extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (window.confirm('This deletes all producer and interviewer notes. Make sure you’ve downloaded them if you want them.')) {
      window.localStorage.clear();
      window.location.reload();
    }
  }

  render() {
    return (
      <div
        onClick={this.onClick}
      >
        {this.props.text}
      </div>
    );
  }
}

export default Reset;
