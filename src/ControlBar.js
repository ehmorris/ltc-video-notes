import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTime } from './actions';
import Clock from './Clock';
import Button from './Button';
import styled, { keyframes } from 'react-emotion';

class ControlBar extends Component {
  constructor(props) {
    super(props);

    this.onAudioUpdate = this.onAudioUpdate.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);

    this.state = {
      time: 0,
    };
  }

  componentDidMount() {
    this.setState({
      time: this.props.time,
    });
  }

  startCounting() {
    this.interval = setInterval(this.onAudioUpdate, 41.70837);
  }

  stopCounting() {
    clearInterval(this.interval);
  }

  onAudioUpdate(time = null) {
    const newTime = this.state.time + .02397600;

    this.setState({
      time: newTime,
    });

    this.props.dispatch(
      updateTime(newTime)
    );
  }

  play() {
    this.startCounting();
    this.props.onPlay();
  }

  pause() {
    this.stopCounting();
    this.props.onPause();
  }

  render() {
    return (
      <Bar>
        <WithIndicator recording={this.props.mode !== 'uninitializedMode' && this.props.mode !== 'pausedMode'}>
          <Clock />
        </WithIndicator>

        {this.props.mode === 'uninitializedMode' &&
          <Button onClick={this.play}>
            Begin Recording
          </Button>
        }

        {this.props.mode === 'producerMode' &&
          <Button onClick={this.pause}>
            Stop
          </Button>
        }

        {this.props.mode === 'pausedMode' &&
          <Button onClick={this.play}>
            Resume
          </Button>
        }
      </Bar>
    );
  }
}

export default connect()(ControlBar);

const Bar = styled('div')`
  width: 100%;
  position: relative;
  top: 0;
  padding: 48px 48px 0;
  min-height: 91px;
  display: flex;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
`

const WithIndicator = styled('div')`
  position: relative;
  margin-right: 48px;

  :before {
    ${props => props.recording ? `animation: ${pulse} 3s infinite;` : ''}
    border-radius: 10px;
    box-shadow: ${props => props.recording ? '-3px 5px 12px rgba(255, 0, 0, .3)' : ''};
    background-color: ${props => props.recording ? 'rgb(255, 0, 0)' : '#999999'};
    content: '';
    height: 10px;
    left: 0;
    position: absolute;
    top: .5em;
    left: -.6em;
    width: 10px;
  }
`;
