import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProducerNote, addNestedProducerNote, addInterviewerNote } from './actions';
import WritingSurface from './WritingSurface';
import Notes from './Notes';
import Button from './Button';
import Label from './Label';
import InterviewerModePreview from './InterviewerModePreview';
import InterviewerModePrompt from './InterviewerModePrompt';
import styled from 'react-emotion';
import { Transition } from 'react-spring';

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

class ProducerMode extends Component {
  constructor(props) {
    super(props);

    this.onProducerNote = this.onProducerNote.bind(this);
    this.onInterviewerNote = this.onInterviewerNote.bind(this);
    this.state = this.sortAndFilterNotes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notes.length !== this.props.notes.length) {
      this.setState(this.sortAndFilterNotes());
    }
  }

  sortAndFilterNotes() {
    return {
      producerNotes: Array.from(nonActionNotesByType(this.props.notes, 'producer')).sort(sortByTimeAndParentDesc),
      interviewerNotes: Array.from(nonActionNotesByType(this.props.notes, 'interviewer')).sort(sortByTimeDesc),
      interviewerNotesWithActions: Array.from(this.props.notes.filter(note => note.type === 'interviewer')).sort(sortByTimeDesc),
    }
  }

  isNestedNote({note}) {
    return note[0] === '-' && this.state.producerNotes.length > 0;
  }

  parentNoteId() {
    const parentNotes = this.state.producerNotes.filter(note => !note.parentId);
    return parentNotes.length > 0 ? parentNotes[0].id : false;
  }

  onProducerNote(note) {
    if (this.isNestedNote(note)) {
      const parentNoteId = this.parentNoteId();
      this.props.dispatch(
        addNestedProducerNote(note.timeStart, note.timeEnd, note.note, parentNoteId)
      );
    } else {
      this.props.dispatch(
        addProducerNote(note.timeStart, note.timeEnd, note.note)
      );
    }
  }

  onInterviewerNote(note) {
    this.props.dispatch(
      addInterviewerNote(note.timeStart, note.timeEnd, note.note)
    );
  }

  render() {
    const latestNoteIsNotAction = this.state.interviewerNotesWithActions.length > 0 && !this.state.interviewerNotesWithActions[0].action;

    return (
      <Grid>
        <Column>
          <WritingSurface
            onAddedNote={this.onProducerNote}
            label="Add a producer note"
            autoFocus
          />
          <Notes notes={this.state.producerNotes} />
        </Column>

        <Column>
          <InterviewerBox>
            <Transition
              native
              from={{ opacity: .5, scale: 0.98 }}
              enter={{ opacity: 1, scale: 1 }}
              leave={{ opacity: 0, scale: 0.98 }}
            >
              {latestNoteIsNotAction
                ? (style => (
                  <InterviewerModePreview
                    style={style}
                    interviewerNotesWithActions={this.state.interviewerNotesWithActions}
                  />
                ))
                : (style => (
                  <InterviewerModePrompt
                    style={style}
                    onAddedNote={this.onInterviewerNote}
                    label="Add an interviewer note"
                  />
                ))
              }
            </Transition>
          </InterviewerBox>

          {this.state.interviewerNotes.length > 0 &&
            <Details>
              <Summary><Label><Button>Interviewer note log</Button></Label></Summary>
              <Notes notes={this.state.interviewerNotes} />
            </Details>
          }
        </Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps
)(ProducerMode);

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

const InterviewerBox = styled('div')`
  width: 100%;
  height: 300px;
  position relative;
  margin-bottom: 24px;
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
