import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from './actions';

class Reset extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (window.confirm('This deletes all producer and interviewer notes. Make sure you’ve downloaded them if you want them.')) {
      this.props.dispatch(reset());
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

export default connect()(Reset);
