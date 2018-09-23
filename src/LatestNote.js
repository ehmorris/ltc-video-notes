import React from 'react';
import styled from 'react-emotion';

const LatestNote = (props) => {
  const latestNotes = props.notes.reverse();
  const latestNoteExists = latestNotes.length > 0 && !latestNotes[0].action;

  return latestNoteExists ? <Text>{latestNotes[0].note}</Text> : null;
};

export default LatestNote;

const Text = styled('div')`
  white-space: pre-wrap;
`;
