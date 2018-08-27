import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTime } from './actions';
import AudioFile from './LTC_00_00_00_00__30mins_23976.wav';
import Audio from 'react-audio-player';

class LTCAudio extends Component {
  constructor(props) {
    super(props);

    this.onAudioUpdate = this.onAudioUpdate.bind(this);
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
          controls
          autoPlay
          muted
          onListen={this.onAudioUpdate}
          listenInterval={100}
          src={AudioFile}
        />
      </div>
    );
  }
}

export default connect()(LTCAudio);
