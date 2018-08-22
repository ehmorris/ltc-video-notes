import React, { Component } from 'react';
import LTCAudio from './LTC_00_00_00_00__30mins_23976.wav';

class App extends Component {
  render() {
    return (
      <div>
        <audio controls autoplay="true" src={LTCAudio}></audio>
      </div>
    );
  }
}

export default App;
