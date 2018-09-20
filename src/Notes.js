import React from 'react';
import styled from 'react-emotion';
import Timecode from './Timecode';
import Label from './Label';

const Notes = ({notes, margin, padding}) => {
  const noteList = notes.map((note) =>
    <Note key={note.timeStart + note.timeEnd}>
      <Text>
        {note.note}
      </Text>
      <Label>
        <Timespan>
          <Timecode time={note.timeStart} /> – <Timecode time={note.timeEnd} />
        </Timespan>
      </Label>
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
  margin-top: 48px;
`;

const Timespan = styled('div')`
  margin-top: .75em;
  font-family: 'IBM Plex Mono', monospace,
`;

const Text = styled('div')`
  white-space: pre-wrap;
`;
