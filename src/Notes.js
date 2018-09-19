import React from 'react';
import styled from 'react-emotion';
import Timecode from './Timecode';

const Notes = ({notes}) => {
  const noteList = notes.map((note) =>
    <Note key={note.timeStart + note.timeEnd}>
      <Text>
        {note.note}
      </Text>
      <Timespan>
        <Timecode time={note.timeStart} /> – <Timecode time={note.timeEnd} />
      </Timespan>
    </Note>
  );

  return (
    <div>
      {noteList}
    </div>
  );
}

export default Notes;

const Note = styled('div')`
  width: 100%;
  padding: 0 48px;
  margin-bottom: 48px;
`;

const Timespan = styled('div')`
  display: flex;
  font-size: 14px;
  font-family: 'IBM Plex Mono', monospace,
`;

const Text = styled('div')`
  white-space: pre-wrap;
`;
