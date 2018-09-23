import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTime } from './actions';
import AudioFile from './LTC_00_00_00_00__30mins_23976.wav';
import Audio from 'react-audio-player';
import Clock from './Clock';
import Button from './Button';
import styled from 'react-emotion';

class ControlBar extends Component {
  constructor(props) {
    super(props);

    this.audioTag = React.createRef();

    this.onAudioUpdate = this.onAudioUpdate.bind(this);
    this.isLoaded = this.isLoaded.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);

    this.state = {
      loaded: false,
      showLoader: false,
    }
  }

  componentDidMount() {
    this.audioTag.current.audioEl.currentTime = this.props.time;

    this.timer = window.setTimeout(() => {
      this.setState({
        showLoader: true,
      });
    }, 1000);

    this.props.dispatch(
      updateTime(this.props.time)
    );
  }

  isLoaded() {
    window.clearTimeout(this.timer);

    this.setState({
      loaded: true,
      showLoader: false,
    });
  }

  onAudioUpdate(time) {
    this.props.dispatch(
      updateTime(time)
    );
  }

  play() {
    this.audioTag.current.audioEl.play();
  }

  pause() {
    this.audioTag.current.audioEl.pause();
  }

  render() {
    return (
      <div>
        <Bar>
          {this.state.showLoader &&
            <div>Loading</div>
          }

          {this.state.loaded &&
            <div>
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
            </div>
          }
        </Bar>

        <Hidden>
          <Audio
            ref={this.audioTag}
            controls
            muted
            onListen={this.onAudioUpdate}
            onPlay={this.props.onPlay}
            onPause={this.props.onPause}
            onCanPlay={this.isLoaded}
            listenInterval={41.70837}
            src={AudioFile}
          />
        </Hidden>
      </div>
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

  > * {
    display: flex;
  }
`;

const Hidden = styled('div')`
  position: absolute;
  top: 0;
  pointer-events: none;
  opacity: 0;
`;

const WithIndicator = styled('div')`
  position: relative;
  margin-right: 48px;

  :before {
    border-radius: 10px;
    box-shadow: ${props => props.recording ? '-3px 5px 12px rgba(255, 0, 0, .2)' : ''};
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
