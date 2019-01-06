import React, { Component } from 'react';
import { connect } from 'react-redux';
import ControlBar from './ControlBar';
import ProducerMode from './ProducerMode';
import InterviewerMode from './InterviewerMode';
import Modal from './Modal';
import PausedMode from './PausedMode';
import UninitializedMode from './UninitializedMode';
import { unReset } from './actions';

const mapStateToProps = state => ({
  time: state.time,
  notes: state.notes,
  wasReset: state.wasReset
});

class App extends Component {
  constructor (props) {
    super(props);

    this.producerMode = this.producerMode.bind(this);
    this.pausedMode = this.pausedMode.bind(this);
    this.modeChannel = new window.BroadcastChannel('ltc_video_notes_mode_channel');

    this.state = {
      mode: 'uninitializedMode'
    };
  }

  componentDidMount () {
    if (this.props.time > 0) {
      this.pausedMode();
    }

    this.modeChannel.postMessage('doesProducerWindowExist');

    this.modeChannel.onmessage = ({ data: message }) => {
      if (message === 'doesProducerWindowExist' && this.state.mode === 'producerMode') {
        this.modeChannel.postMessage('producerWindowExists');
      }

      if (message === 'producerWindowExists') {
        this.interviewerMode();
      }
    };
  }

  componentDidUpdate () {
    if (this.props.wasReset === true && this.state.mode !== 'uninitializedMode') {
      this.uninitializedMode();
      this.props.dispatch(unReset());
    }
  }

  uninitializedMode () {
    this.setState({
      mode: 'uninitializedMode'
    });
  }

  producerMode () {
    this.setState({
      mode: 'producerMode'
    });

    this.modeChannel.postMessage('producerWindowExists');
  }

  interviewerMode () {
    this.setState({
      mode: 'interviewerMode'
    });
  }

  pausedMode () {
    this.setState({
      mode: 'pausedMode'
    });
  }

  render () {
    return (
      <div>
        {this.state.mode !== 'interviewerMode' &&
          <ControlBar
            mode={this.state.mode}
            onPlay={this.producerMode}
            onPause={this.pausedMode}
          />
        }

        <Modal showOn={this.state.mode === 'uninitializedMode'}>
          <UninitializedMode />
        </Modal>

        <Modal showOn={this.state.mode === 'pausedMode'}>
          <PausedMode notes={this.props.notes} />
        </Modal>

        {this.state.mode === 'producerMode' &&
          <ProducerMode />
        }

        {this.state.mode === 'interviewerMode' &&
          <InterviewerMode />
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(App);
