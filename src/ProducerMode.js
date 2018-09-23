import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProducerNote, addInterviewerNote, clearInterviewerNotes } from './actions';
import WritingSurface from './WritingSurface';
import LatestNote from './LatestNote';
import Notes from './Notes';
import Button from './Button';
import Label from './Label';
import styled from 'react-emotion';
import { Spring } from 'react-spring';

const filteredNotes = (notes, filter) => {
  return notes.filter(note => note.type === filter && !note.action).reverse();
}

class ProducerMode extends Component {
  constructor(props) {
    super(props);

    this.onProducerNote = this.onProducerNote.bind(this);
    this.onInterviewerNote = this.onInterviewerNote.bind(this);
    this.onClearPrompt = this.onClearPrompt.bind(this);
    this.updateNotes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notes.length !== this.props.notes.length) {
      this.updateNotes();
    }
  }

  updateNotes() {
    this.producerNotes = filteredNotes(this.props.notes, 'producer');
    this.interviewerNotes = filteredNotes(this.props.notes, 'interviewer');
    this.rawInterviewerNotes = this.props.notes.filter(note => note.type === 'interviewer').reverse();
  }

  onProducerNote(note) {
    this.props.dispatch(
      addProducerNote(note.timeStart, note.timeEnd, note.note)
    );
  }

  onInterviewerNote(note) {
    this.props.dispatch(
      addInterviewerNote(note.timeStart, note.timeEnd, note.note)
    );
  }

  onClearPrompt() {
    this.props.dispatch(clearInterviewerNotes());
  }

  render() {
    const noteExists = this.rawInterviewerNotes.length > 0 && !this.rawInterviewerNotes[0].action;

    return (
      <Grid>
        <Column>
          <WritingSurface
            onAddedNote={this.onProducerNote}
            time={this.props.time}
            label="Add a producer note"
          />
          <Notes notes={this.producerNotes} />
        </Column>

        <Column>
          {noteExists &&
            <Spring
              from={{ opacity: .5, transform: 'scale(0.98)' }}
              to={{ opacity: 1, transform: 'scale(1)' }}
              config={{ duration: 200 }}
            >
              {styles => {
                return (
                  <div style={{...styles, ...preview}}>
                    <UrgentLabels>
                      <Label>Live on the prompt</Label>
                      <Label>
                        <Button onClick={this.onClearPrompt}>
                          Clear prompt
                        </Button>
                      </Label>
                    </UrgentLabels>
                    <LatestNote notes={this.rawInterviewerNotes} />
                  </div>
                );
              }}
            </Spring>
          }

          <InterviewerNotePrompt>
            <WritingSurface
              onAddedNote={this.onInterviewerNote}
              time={this.props.time}
              label="Add an interviewer note"
            />
          </InterviewerNotePrompt>

          {this.rawInterviewerNotes.length > 0 &&
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

const preview = {
  border: '1px solid red',
  padding: '24px',
  marginBottom: '24px',
};

const UrgentLabels = styled('div')`
  display: flex;
  margin-bottom: .35rem;
  justify-content: space-between;
  width: 100%;
  color: rgb(255, 0, 0);
`;

const InterviewerNotePrompt = styled('div')`
  border: 1px solid #000;
  margin-bottom: 24px;
  padding: 24px;
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
