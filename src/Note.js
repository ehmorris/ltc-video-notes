import React from 'react';
import Label from './Label';
import Timecode from './Timecode';
import styled from 'react-emotion';
import { animated } from 'react-spring';

const Note = ({style, note}) => {
  return (
    <animated.div style={{...style, ...noteContainer}}>
      <Text>
        {note.note}
      </Text>
      <Label>
        <Timespan>
          <Timecode time={note.timeStart} /> – <Timecode time={note.timeEnd} />
        </Timespan>
      </Label>
    </animated.div>
  );
};

export default Note;

const noteContainer = {
  width: '100%',
  marginTop: '48px',
};

const Timespan = styled('div')`
  margin-top: .75em;
  font-family: 'IBM Plex Mono', monospace;
`;

const Text = styled('div')`
  white-space: pre-wrap;
`;
