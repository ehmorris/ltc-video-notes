import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Timecode from './Timecode';

const mapStateToProps = state => ({
  time: state.time,
});

class Clock extends Component {
  render() {
    return (
      <Monospace>
        <Timecode time={this.props.time} />
      </Monospace>
    );
  }
}

export default connect(
  mapStateToProps
)(Clock);

const Monospace = styled('div')`
  font-family: 'IBM Plex Mono', monospace;
`;
