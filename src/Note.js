import React from 'react';
import Label from './Label';
import Timecode from './Timecode';
import styled from 'react-emotion';
import { animated } from 'react-spring';

const Note = ({style, note}) => {
  return (
    <NoteContainer {...style}>
      <Text>
        {note.note}
      </Text>
      <Label>
        <Timespan>
          <Timecode time={note.timeStart} /> – <Timecode time={note.timeEnd} />
        </Timespan>
      </Label>
    </NoteContainer>
  );
};

export default Note;

const NoteContainer = styled(animated.div)`
  width: 100%;
  margin-top: 48px;
  opacity: ${props => props.opacity};
  transform: translateY(${props => props.y}px);
`;

const Timespan = styled('div')`
  margin-top: .75em;
  font-family: 'IBM Plex Mono', monospace,
`;

const Text = styled('div')`
  white-space: pre-wrap;
`;
