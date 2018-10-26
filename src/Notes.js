import React from 'react';
import { connect } from 'react-redux';
import { Trail } from 'react-spring';
import Note from './Note';

const nonActionNotesByType = (notes, filter) => notes.filter(note => note.type === filter && !note.action);

const sortByTimeAndParentDesc = (note1, note2) => {
  if (!note1.parentId && note1.id === note2.parentId) {
    return -1;
  } else {
    return note2.timeStart - note1.timeStart;
  }
}

const sortByTimeDesc = (note1, note2) => note2.timeStart - note1.timeStart;

const mapStateToProps = state => ({
  notes: state.notes,
});

const Notes = (props) => {
  const sortedFilteredNotes = props.includesSubNotes ?
    Array.from(
      nonActionNotesByType(props.notes, props.filterByType)
    ).sort(sortByTimeAndParentDesc)
    :
    Array.from(
      nonActionNotesByType(props.notes, props.filterByType)
    ).sort(sortByTimeDesc);

  return (
    <Trail
      native
      keys={sortedFilteredNotes.map(note => note.id)}
      from={{ opacity: .5, y: -15 }}
      to={{ opacity: 1, y: 0 }}
    >
      {sortedFilteredNotes.map(note => styles => <Note style={styles} note={note} />)}
    </Trail>
  );
}

export default connect(
  mapStateToProps
)(Notes);
