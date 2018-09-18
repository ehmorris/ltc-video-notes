import React, { Component } from 'react';
import { connect } from 'react-redux';
import SMPTETimecode from 'smpte-timecode';

const mapStateToProps = state => ({
  producerNotes: state.notes.filter(note => note.type === 'producer'),
  interviewerNotes: state.notes.filter(note => note.type === 'interviewer'),
});

const pad = (n) => n < 10 ? `0${n}` : n;

const formatTime = (time) => {
  let dateObject = new Date();
  dateObject.setHours(0, 0, 0);
  dateObject.setMilliseconds(time * 1000);

  return new SMPTETimecode(dateObject).toString();
}

const formatNote = ({timeStart, timeEnd, note}) => {
  return `
Started: ${formatTime(timeStart)}
Entered: ${formatTime(timeEnd)}
Note Content:
${note}
`;
}

const notesToString = (notes) => {
  return notes.map(note => formatNote(note)).join('');
}

class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileURL: null,
    }
  }

  componentDidMount() {
    const notes = `PRODUCER NOTES:
${notesToString(this.props.producerNotes)}

INTERVIEWER NOTES:
${notesToString(this.props.interviewerNotes)}`;

    const file = new Blob([notes], {
      type: 'text/plain'
    });

    const url = URL.createObjectURL(file);

    this.setState({
      fileURL: url,
    });
  }

  render() {
    const sysTime = new Date();
    const localTime = `${pad(sysTime.getHours())}${pad(sysTime.getMinutes())}`;
    const localDate = `${pad(sysTime.getMonth() + 1)}${pad(sysTime.getDate())}${sysTime.getFullYear()}`;
    const filename = `video_notes_${localTime}_${localDate}`;

    return (
      <div>
        <a
          href={this.state.fileURL}
          download={filename}
          style={{
            textDecoration: 'inherit',
            color: 'inherit',
          }}
        >
          Download notes
        </a>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(Download);
