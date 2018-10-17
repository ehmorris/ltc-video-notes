import React, { Component } from 'react';
import styled from 'react-emotion';
import Reset from './Reset';
import Download from './Download';
import Button from './Button';
import Label from './Label';

const pluralize = (word, count) => {
  return `${word}${count === 1 ? '' : 's'}`;
};

class PausedMode extends Component {
  constructor(props) {
    super(props);

    this.producerNotes = this.props.notes.filter(note => note.type === 'producer' && !note.action);
    this.interviewerNotes = this.props.notes.filter(note => note.type === 'interviewer' && !note.action);
  }

  render() {
    const notesExist = this.props.notes.length > 0;
    const producerNoteCount = this.producerNotes.length;
    const interviewerNoteCount = this.interviewerNotes.length;

    const producerNoteCountSentence = `
      There ${producerNoteCount === 1 ? 'is' : 'are'}
      ${producerNoteCount}
      producer ${pluralize('note', producerNoteCount)}`;

    const interviewerNoteCountSentence = `
      and ${interviewerNoteCount}
      interviewer ${pluralize('note', interviewerNoteCount)}`;

    return (
      <Container>
        {!notesExist &&
          <div>You haven’t made any notes yet.</div>
        }

        {notesExist &&
          <div>
            {producerNoteCountSentence}{interviewerNoteCountSentence}.
            Resume to view all notes.
          </div>
        }

        <Actions>
          <Button disabled={!notesExist}>
            <Download />
          </Button>
          <Button>
            <Reset text={notesExist ? 'Clear notes and reset' : 'Reset timer'} />
          </Button>
          <Label>
            To fullscreen the new window in Chrome, press control+command+F, then shift+command+F to hide the toolbar.
          </Label>
        </Actions>
      </Container>
    );
  }
}

export default PausedMode;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const Actions = styled('div')`
  > * {
    margin-top: 24px;
  }
`;
