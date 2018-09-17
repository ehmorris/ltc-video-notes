import React, { Component } from 'react';
import { connect } from 'react-redux';
import ControlBar from './ControlBar';
import ForProducer from './ForProducer';
import ForInterviewer from './ForInterviewer';
import PausedMode from './PausedMode';
import Modal from './Modal';

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
          <ControlBar
            mode={this.state.mode}
            onPlay={this.producerMode}
            onPause={this.pausedMode}
          />
        }

        {this.state.mode === 'uninitializedMode' &&
          <Modal>
            <div>First click "Begin recording", and you’ll see producer mode.</div>
            <div>Then open a new window and it’ll automatically turn into interviewer mode</div>
          </Modal>
        }

        {this.state.mode === 'producerMode' &&
          <ForProducer />
        }

        {this.state.mode === 'interviewerMode' &&
          <ForInterviewer />
        }

        {this.state.mode === 'pausedMode' &&
          <PausedMode />
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(App);
