import React from 'react';
import styled from 'react-emotion';

const LatestNote = (props) => {
  const latestNoteExists = props.notes.length > 0 && !props.notes[0].action;

  return latestNoteExists ? <Text>{props.notes[0].note}</Text> : null;
};

export default LatestNote;

const Text = styled('div')`
  white-space: pre-wrap;
`;
