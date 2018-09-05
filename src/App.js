import React, { Component } from 'react';
import LTCAudio from './LTCAudio';
import ForProducer from './ForProducer';
import ForInterviewer from './ForInterviewer';

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
