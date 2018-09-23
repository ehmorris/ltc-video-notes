import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProducerNote, addInterviewerNote, clearInterviewerNotes } from './actions';
import WritingSurface from './WritingSurface';
import LatestNote from './LatestNote';
import Notes from './Notes';
import Button from './Button';
import Label from './Label';
import styled from 'react-emotion';


const filteredNotes = (notes, filter) => {
  return notes.filter(note => note.type === filter && !note.action).reverse();
}

class ProducerMode extends Component {
  constructor(props) {
    super(props);

    this.onProducerNote = this.onProducerNote.bind(this);
    this.onInterviewerNote = this.onInterviewerNote.bind(this);
    this.onClearPrompt = this.onClearPrompt.bind(this);
    this.producerNotes = filteredNotes(this.props.notes, 'producer');
    this.interviewerNotes = filteredNotes(this.props.notes, 'interviewer');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notes.length !== this.props.notes.length) {
      this.producerNotes = filteredNotes(this.props.notes, 'producer');
      this.interviewerNotes = filteredNotes(this.props.notes, 'interviewer');
    }
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
          <Preview>
            <UrgentLabels>
              <Label>Live on the prompt</Label>
              <Label>
                <Button onClick={this.onClearPrompt}>
                  Clear prompt
                </Button>
              </Label>
            </UrgentLabels>
            <LatestNote notes={this.interviewerNotes} />
          </Preview>
          <InterviewerNotePrompt>
            <WritingSurface
              onAddedNote={this.onInterviewerNote}
              time={this.props.time}
              label="Add an interviewer note"
            />
          </InterviewerNotePrompt>
          <Details>
            <Summary><Label>Interviewer note log</Label></Summary>
            <Notes notes={this.interviewerNotes} />
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

const Preview = styled('div')`
  border: 1px solid red;
  padding: 24px;
`;

const UrgentLabels = styled('div')`
  display: flex;
  margin-bottom: .35rem;
  justify-content: space-between;
  width: 100%;
  color: rgb(255, 0, 0);
`;

const InterviewerNotePrompt = styled('div')`
  border: 1px solid #000;
  margin-top: 24px;
  padding: 24px;
`;

const Details = styled('details')`
  border: 1px solid #000;
  margin: 24px 0;
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
