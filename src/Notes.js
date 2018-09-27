import React from 'react';
import Note from './Note';
import { Trail } from 'react-spring';

const Notes = ({notes}) => {
  return (
    <Trail
      native
      keys={notes.map(note => note.timeStart + note.timeEnd)}
      from={{ opacity: .5, transform: 'translateY(-15px)' }}
      to={{ opacity: 1, transform: 'translateY(0px)' }}
    >
      {notes.map(note => styles => <Note style={styles} note={note} />)}
    </Trail>
  );
}

export default Notes;
