import React, { Component } from 'react';
import LTCAudio from './LTC_00_00_00_00__30mins_23976.wav';
import Audio from 'react-audio-player';
import ForProducer from './ForProducer';
import ForInterviewer from './ForInterviewer';

class App extends Component {
  constructor(props) {
    super(props);

    this.onAudioUpdate = this.onAudioUpdate.bind(this);
    this.onNotesForInterviewerUpdate = this.onNotesForInterviewerUpdate.bind(this);
    this.onChannelMessage = this.onChannelMessage.bind(this);

    this.state = {
      mode: 'forProducer',
      time: 0,
      notesForInterviewer: [],
    }
  }

  componentDidMount() {
    this.channel = new window.BroadcastChannel('channel');
    this.channel.onmessage = this.onChannelMessage;
  }

  onChannelMessage({data}) {
    this.setState({...data});

    if (data.time) {
      this.setState({
        mode: 'forInterviewer',
      });
    }
  }

  sendChannelMessage(message) {
    this.channel.postMessage(message);
  }

  onNotesForInterviewerUpdate(notes) {
    this.setState({
      notesForInterviewer: notes,
    });

    this.sendChannelMessage({
      notesForInterviewer: notes,
    });
  }

  onAudioUpdate(time) {
    this.setState({
      time: time,
    });

    this.sendChannelMessage({
      time: time,
    });
  }

  render() {
    return (
      <div>
        {this.state.mode === 'forProducer' &&
          <div>
            <Audio
              controls
              autoPlay
              muted
              onListen={this.onAudioUpdate}
              listenInterval={100}
              src={LTCAudio}
            />

            <ForProducer
              time={this.state.time}
              onNotesForInterviewerUpdate={this.onNotesForInterviewerUpdate}
            />
          </div>
        }

        {this.state.mode === 'forInterviewer' &&
          <ForInterviewer
            time={this.state.time}
            notesForInterviewer={this.state.notesForInterviewer}
          />
        }
      </div>
    );
  }
}

export default App;
