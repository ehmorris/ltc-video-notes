import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProducerNote, addNestedProducerNote } from './actions';
import WritingSurface from './WritingSurface';
import Notes from './Notes';
import Button from './Button';
import Label from './Label';
import InterviewerModePreviewAndPrompt from './InterviewerModePreviewAndPrompt';
import styled from 'react-emotion';

class ProducerMode extends Component {
  constructor(props) {
    super(props);

    this.onProducerNote = this.onProducerNote.bind(this);
  }

  onProducerNote(note) {
    if (note.parentNoteId) {
      this.props.dispatch(
        addNestedProducerNote(note.timeStart, note.timeEnd, note.note, note.parentNoteId)
      );
    } else {
      this.props.dispatch(
        addProducerNote(note.timeStart, note.timeEnd, note.note)
      );
    }
  }

  render() {
    return (
      <Grid>
        <Column>
          <WritingSurface
            onAddedNote={this.onProducerNote}
            noteType="producer"
            label="Add a producer note"
            autoFocus
          />
          <Notes filterByType="producer" includesSubNotes={true} />
        </Column>
        <Column>
          <InterviewerModePreviewAndPrompt />
          <Details>
            <Summary><Label><Button>Interviewer note log</Button></Label></Summary>
            <Notes filterByType="interviewer" includesSubNotes={false} />
          </Details>
        </Column>
      </Grid>
    );
  }
}

export default connect()(ProducerMode);

const Grid = styled('div')`
  display: grid;
  grid-template-columns: 1fr minmax(450px, 40%);
  width: 100%;
`;

const Column = styled('div')`
  display: flex;
  padding: 48px;
  flex-direction: column;
`;

const Details = styled('details')`
  border: 1px solid #000;
  margin-bottom: 24px;
  padding: 24px;
`;

const Summary = styled('summary')`
  outline: none;
  cursor: pointer;
  user-select: none;

  ::-webkit-details-marker {
    display: none;
  }
`;
