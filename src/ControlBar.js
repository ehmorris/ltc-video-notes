import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTime } from './actions';
import AudioFile from './LTC_00_00_00_00__30mins_23976.wav';
import Audio from 'react-audio-player';
import Clock from './Clock';
import Button from './Button';
import styled from 'react-emotion';

const mapStateToProps = state => ({
  time: state.time,
});

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
    }
  }

  componentDidMount() {
    this.audioTag.current.audioEl.currentTime = this.props.time;

    this.props.dispatch(
      updateTime(this.props.time)
    );
  }

  isLoaded() {
    this.setState({
      loaded: true,
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
        {!this.state.loaded &&
          <Bar>
            Loading
          </Bar>
        }

        {this.state.loaded &&
          <Bar mode={this.props.mode}>
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
        }

        <Hidden>
          <Audio
            ref={this.audioTag}
            controls
            muted
            onListen={this.onAudioUpdate}
            onPlay={this.props.onPlay}
            onPause={this.props.onPause}
            onCanPlay={this.isLoaded}
            listenInterval={41.71}
            src={AudioFile}
          />
        </Hidden>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(ControlBar);

const Bar = styled('div')`
  width: 100%;
  position: relative;
  top: 0;
  padding: 48px 48px 0;
  display: flex;
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
