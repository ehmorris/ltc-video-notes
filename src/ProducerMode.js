import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProducerNote, addNestedProducerNote, addInterviewerNote, clearInterviewerNotes } from './actions';
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

const sortByTimeAsc = (note1, note2) => note2.timeStart - note1.timeStart;

class ProducerMode extends Component {
  constructor(props) {
    super(props);

    this.onProducerNote = this.onProducerNote.bind(this);
    this.onInterviewerNote = this.onInterviewerNote.bind(this);
    this.onClearPrompt = this.onClearPrompt.bind(this);
    this.sortAndFilterNotes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notes.length !== this.props.notes.length) {
      this.sortAndFilterNotes();
    }
  }

  sortAndFilterNotes() {
    this.producerNotes = Array.from(nonActionNotesByType(this.props.notes, 'producer')).sort(sortByTimeAndParentDesc);
    this.interviewerNotes = Array.from(nonActionNotesByType(this.props.notes, 'interviewer')).sort(sortByTimeAsc);
    this.interviewerNotesWithActions = Array.from(this.props.notes.filter(note => note.type === 'interviewer')).sort(sortByTimeAsc);
   }

  isNestedNote({note}) {
    return note[0] === '-' && this.producerNotes.length > 0;
  }

  parentNoteId() {
    const parentNotes = this.producerNotes.filter(note => !note.parentId);
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

  onClearPrompt() {
    this.props.dispatch(clearInterviewerNotes(this.props.time, this.props.time));
  }

  render() {
    const latestNoteIsNotAction = this.interviewerNotesWithActions.length > 0 && !this.interviewerNotesWithActions[0].action;

    return (
      <Grid>
        <Column>
          <WritingSurface
            onAddedNote={this.onProducerNote}
            time={this.props.time}
            label="Add a producer note"
            autoFocus
          />
          <Notes notes={this.producerNotes} />
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
                    onClearPrompt={this.onClearPrompt}
                    interviewerNotesWithActions={this.interviewerNotesWithActions}
                  />
                ))
                : (style => (
                  <InterviewerModePrompt
                    style={style}
                    onAddedNote={this.onInterviewerNote}
                    time={this.props.time}
                    label="Add an interviewer note"
                  />
                ))
              }
            </Transition>
          </InterviewerBox>

          {this.interviewerNotes.length > 0 &&
            <Details>
              <Summary><Label><Button>Interviewer note log</Button></Label></Summary>
              <Notes notes={this.interviewerNotes} />
            </Details>
          }
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
