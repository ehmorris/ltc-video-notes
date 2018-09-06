import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTime } from './actions';
import AudioFile from './LTC_00_00_00_00__30mins_23976.wav';
import Audio from 'react-audio-player';

const mapStateToProps = state => ({
  time: state.time,
});

class LTCAudio extends Component {
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
      <div>
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(LTCAudio);
