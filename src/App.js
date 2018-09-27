import React, { Component } from 'react';
import { connect } from 'react-redux';
import ControlBar from './ControlBar';
import ProducerMode from './ProducerMode';
import InterviewerMode from './InterviewerMode';
import PausedMode from './PausedMode';
import UninitializedMode from './UninitializedMode';
import { Transition } from 'react-spring';

const mapStateToProps = state => ({
  time: state.time,
  notes: state.notes,
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
            time={this.props.time}
            onPlay={this.producerMode}
            onPause={this.pausedMode}
          />
        }

        <Transition
          native
          from={{ opacity: .5, scale: 0.98 }}
          enter={{ opacity: 1, scale: 1 }}
          leave={{ opacity: 0, scale: 0.98 }}
        >
          {this.state.mode === 'uninitializedMode' && (style => <UninitializedMode style={style} />)}
        </Transition>

        {this.state.mode === 'producerMode' &&
          <ProducerMode
            time={this.props.time}
            notes={this.props.notes}
          />
        }

        {this.state.mode === 'interviewerMode' &&
          <InterviewerMode
            time={this.props.time}
            notes={this.props.notes}
          />
        }

        <Transition
          native
          from={{ opacity: .5, scale: 0.98 }}
          enter={{ opacity: 1, scale: 1 }}
          leave={{ opacity: 0, scale: 0.98 }}
        >
          {this.state.mode === 'pausedMode' && (style => <PausedMode style={style} notes={this.props.notes} />)}
        </Transition>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(App);
