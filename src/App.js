import React, { Component } from 'react';
import LTCAudio from './LTC_00_00_00_00__30mins_23976.wav';
import Audio from 'react-audio-player';
import ForProducer from './ForProducer';
import ForInterviewer from './ForInterviewer';

class App extends Component {
  constructor(props) {
    super(props);

    this.onAudioUpdate = this.onAudioUpdate.bind(this);

    this.state = {
      mode: 'forProducer',
      time: 0,
    }
  }

  onAudioUpdate(time) {
    this.setState({
      time: time,
    });
  }

  render() {
    return (
      <div>
        {this.state.mode === 'forProducer' &&
          <div>
            <Audio
              controls
              autoPlay
              muted
              onListen={this.onAudioUpdate}
              listenInterval={100}
              src={LTCAudio}
            />

            <ForProducer time={this.state.time} />
          </div>
        }

        {this.state.mode === 'forInterviewer' &&
          <ForInterviewer time={this.state.time} />
        }
      </div>
    );
  }
}

export default App;
