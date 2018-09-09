import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTime } from './actions';
import AudioFile from './LTC_00_00_00_00__30mins_23976.wav';
import Audio from 'react-audio-player';
import styled, { css } from 'react-emotion';

const mapStateToProps = state => ({
  time: state.time,
});

const Bar = styled('div')`
  width: 100%;
  background: #000;
  color: #fff;
`;

class ControlBar extends Component {
  constructor(props) {
    super(props);

    this.audioTag = React.createRef();

    this.onAudioUpdate = this.onAudioUpdate.bind(this);
  }

  componentDidMount() {
    this.audioTag.current.audioEl.currentTime = this.props.time;

    this.props.dispatch(
      updateTime(this.props.time)
    );
  }

  onAudioUpdate(time) {
    this.props.dispatch(
      updateTime(time)
    );
  }

  render() {
    return (
      <Bar>
        <Audio
          ref={this.audioTag}
          controls
          muted
          onListen={this.onAudioUpdate}
          onPlay={this.props.onPlay}
          onPause={this.props.onPause}
          listenInterval={100}
          src={AudioFile}
        />
      </Bar>
    );
  }
}

export default connect(
  mapStateToProps
)(ControlBar);
