import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

const mapStateToProps = state => ({
  time: state.time,
});

const pad = (n) => n < 10 ? `0${n}` : n;

class Clock extends Component {
  render() {
    const date = new Date(this.props.time * 1000);
    const formattedTime = [
      pad(date.getUTCHours()),
      pad(date.getUTCMinutes()),
      pad(date.getUTCSeconds()),
      (((date.getUTCMilliseconds() / 1000) * .23976) + 1).toFixed(2).slice(2, 5),
    ].join(':');

    return (
      <Monospace>
        {formattedTime}
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
