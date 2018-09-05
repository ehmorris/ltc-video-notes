import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  time: state.time,
});

class Clock extends Component {
  render() {
    return (
      <div>
        {this.props.time}
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(Clock);
