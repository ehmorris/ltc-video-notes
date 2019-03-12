import React, { Component } from 'react';
import { connect } from 'react-redux';
import SMPTETimecode from 'smpte-timecode';
import styled from 'react-emotion';

const nonActionNotesByType = (notes, filter) => notes.filter(note => note.type === filter && !note.action);

const sortByTimeAsc = (note1, note2) => note1.timeStart - note2.timeStart;

const mapStateToProps = state => ({
  metadata: state.metadata,
  producerNotes: nonActionNotesByType(state.notes, 'producer').sort(sortByTimeAsc),
  interviewerNotes: nonActionNotesByType(state.notes, 'interviewer').sort(sortByTimeAsc)
});

const pad = (n) => n < 10 ? `0${n}` : n;

const formatTime = (time) => {
  let dateObject = new Date();
  dateObject.setHours(0, 0, 0);
  dateObject.setMilliseconds(time * 1000);

  return new SMPTETimecode(dateObject, 23.976).toString();
};

const formatNote = ({ timeStart, timeEnd, note }) => {
  return `
[${formatTime(timeStart)}]    ${note}
[${formatTime(timeEnd)}]

`;
};

const notesToString = (notes) => {
  return notes.map(note => formatNote(note)).join('');
};

class Download extends Component {
  constructor (props) {
    super(props);

    this.state = {
      fileURL: null
    };
  }

  componentDidMount () {
    const notes = `NOTES INITIALIZED:
${this.props.metadata.timeOfDayInitialized}

-----

PRODUCER NOTES:
${notesToString(this.props.producerNotes)}

INTERVIEWER NOTES:
${notesToString(this.props.interviewerNotes)}

-----

DEBUG USER AGENT:
${this.props.metadata.userAgent}
`;

    const file = new window.Blob([notes], {
      type: 'text/plain'
    });

    const url = URL.createObjectURL(file);

    this.setState({
      fileURL: url
    });
  }

  render () {
    const sysTime = new Date();
    const localTime = `${pad(sysTime.getHours())}${pad(sysTime.getMinutes())}`;
    const localDate = `${pad(sysTime.getMonth() + 1)}${pad(sysTime.getDate())}${sysTime.getFullYear()}`;
    const filename = `video_notes_${localTime}_${localDate}`;

    return (
      <InheritingLink
        href={this.state.fileURL}
        download={filename}
      >
        Download notes
      </InheritingLink>
    );
  }
}

export default connect(
  mapStateToProps
)(Download);

const InheritingLink = styled('a')`
  text-decoration: inherit;
  color: inherit;
`;
