import React, { Component } from 'react';
import LTCAudio from './LTCAudio';
import ForProducer from './ForProducer';
import ForInterviewer from './ForInterviewer';
import ClockContainer from './ClockContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'forProducer',
    }
  }

  render() {
    return (
      <div>
        {this.state.mode === 'forProducer' &&
          <div>
            <LTCAudio />
            <ClockContainer />
            <ForProducer />
          </div>
        }

        {this.state.mode === 'forInterviewer' &&
          <ForInterviewer />
        }
      </div>
    );
  }
}

export default App;
