import React from 'react';
import Note from './Note';
import { Trail } from 'react-spring';

const Notes = ({notes}) => {
  return (
    <Trail
      native
      keys={notes.map(note => note.id)}
      from={{ opacity: .5, y: -15 }}
      to={{ opacity: 1, y: 0 }}
    >
      {notes.map(note => styles => <Note style={styles} note={note} />)}
    </Trail>
  );
}

export default Notes;
