import React, { Component } from 'react';
import LTCAudio from './LTCAudio';
import ForProducer from './ForProducer';
import ForInterviewer from './ForInterviewer';

class App extends Component {
  constructor(props) {
    super(props);

    this.makeInterviewer = this.makeInterviewer.bind(this);

    this.state = {
      mode: 'forProducer',
    }
  }

  makeInterviewer() {
    this.setState({
      mode: 'forInterviewer',
    });
  }

  render() {
    return (
      <div>
        <div
          onClick={this.makeInterviewer}
        >Make this screen an interviewer screen</div>

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
