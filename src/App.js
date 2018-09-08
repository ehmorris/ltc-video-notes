import React, { Component } from 'react';
import { connect } from 'react-redux';
import LTCAudio from './LTCAudio';
import ForProducer from './ForProducer';
import ForInterviewer from './ForInterviewer';
import Reset from './Reset';
import Download from './Download';

const mapStateToProps = state => ({
  time: state.time,
});

class App extends Component {
  constructor(props) {
    super(props);

    this.producerMode = this.producerMode.bind(this);
    this.pausedMode = this.pausedMode.bind(this);

    this.state = {
      mode: 'uninitializedMode',
    }
  }

  componentDidMount() {
    if (this.props.time > 0) {
      this.pausedMode();
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.state.mode === 'pausedMode' || this.state.mode === 'uninitializedMode') && prevProps.time !== this.props.time) {
      this.interviewerMode();
    }
  }

  uninitializedMode() {
    this.setState({
      mode: 'uninitializedMode',
    });
  }

  producerMode() {
    this.setState({
      mode: 'producerMode',
    });
  }

  interviewerMode() {
    this.setState({
      mode: 'interviewerMode',
    });
  }

  pausedMode() {
    this.setState({
      mode: 'pausedMode',
    });
  }

  render() {
    return (
      <div>
        {this.state.mode !== 'interviewerMode' &&
          <LTCAudio
            onPlay={this.producerMode}
            onPause={this.pausedMode}
          />
        }

        {this.state.mode === 'uninitializedMode' &&
          <ol>
            <li>Begin recording, and you will see producer mode</li>
            <li>Open new window to get interviewer mode</li>
          </ol>
        }

        {this.state.mode === 'producerMode' &&
          <ForProducer />
        }

        {this.state.mode === 'interviewerMode' &&
          <ForInterviewer />
        }

        {this.state.mode === 'pausedMode' &&
          <div>
            <Download />
            <Reset />
          </div>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(App);
