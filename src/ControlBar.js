import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTime } from './actions';
import AudioFile from './LTC_00_00_00_00__30mins_23976.wav';
import Audio from 'react-audio-player';
import styled from 'react-emotion';
import Clock from './Clock';

const mapStateToProps = state => ({
  time: state.time,
});

const Bar = styled('div')`
  width: 100%;
  height: 88px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.mode === 'producerMode' ? 'var(--color-red)' : 'transparent'};
`;

const RedBar = styled('Bar')`
  background-color: var(--color-red);
  color: #fff;
`;

const Padded = styled('div')`
  padding: 0 40px;
`;

const Hidden = styled('div')`
  position: absolute;
  top: 0;
  pointer-events: none;
  opacity: 0;
`;

const RedButton = styled('div')`
  color: var(--color-red);
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  :before {
    content: '';
    width: .8em;
    height: .8em;
    background-color: var(--color-red);
    border-radius: .8em;
    position: relative;
    top: 1px;
    left: 26px;
  }
`;

const WhiteButton = styled('RedButton')`
  color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  :before {
    content: '';
    width: .8em;
    height: .8em;
    background-color: #fff;
    border-radius: .8em;
    position: relative;
    top: 1px;
    left: 26px;
  }
`;

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

  play() {
    this.audioTag.current.audioEl.play();
  }

  pause() {
    this.audioTag.current.audioEl.pause();
  }

  onAudioUpdate(time) {
    this.props.dispatch(
      updateTime(time)
    );
  }

  render() {
    return (
      <div>
        {!this.state.loaded &&
          <Bar>
            <div>Loading</div>
          </Bar>
        }

        {this.state.loaded &&
          <Bar mode={this.props.mode}>
            <Padded>
              <Clock />
            </Padded>

            {this.props.mode === 'uninitializedMode' &&
              <RedButton onClick={this.play}>
                <Padded>
                  Begin Recording
                </Padded>
              </RedButton>
            }

            {this.props.mode === 'producerMode' &&
              <WhiteButton onClick={this.pause}>
                <Padded>
                  Stop
                </Padded>
              </WhiteButton>
            }

            {this.props.mode === 'pausedMode' &&
              <RedButton onClick={this.play}>
                <Padded>
                  Resume
                </Padded>
              </RedButton>
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
