import React, { Component } from 'react';
import LTCAudio from './LTC_00_00_00_00__30mins_23976.wav';
import Audio from 'react-audio-player';
import WritingSurface from './WritingSurface';

class App extends Component {
  constructor(props) {
    super(props);

    this.onListen = this.onListen.bind(this);

    this.state = {
      time: 0,
    }
  }

  onListen(time) {
    this.setState({
      time: time,
    });
  }

  render() {
    return (
      <div>
        <Audio
          controls
          autoPlay
          muted
          onListen={this.onListen}
          listenInterval={100}
          src={LTCAudio}
        />

        <div>{this.state.time}</div>

        <WritingSurface
          time={this.state.time}
          label="For Interviewer"
        />

        <WritingSurface
          time={this.state.time}
          label="For Producer"
        />
      </div>
    );
  }
}

export default App;
