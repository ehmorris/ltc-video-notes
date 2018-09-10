import React, { Component } from 'react';
import styled from 'react-emotion';

const Note = styled('div')`
  width: 100%;
  padding: 40px;
`;

const Timespan = styled('div')`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
`;

const Text = styled('div')`
  white-space: pre;
`;

class Notes extends Component {
  render() {
    const notes = this.props.notes.map((note) =>
      <Note key={note.timeStart + note.timeEnd}>
        <Timespan>
          <div>{note.timeStart}</div>
          <div>{note.timeEnd}</div>
        </Timespan>
        <Text>
          {note.note}
        </Text>
      </Note>
    );

    return (
      <div>
        {notes}
      </div>
    );
  }
}

export default Notes;
