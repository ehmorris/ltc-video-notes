import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Reset from './Reset';
import Download from './Download';
import Button from './Button';
import Modal from './Modal';

const mapStateToProps = state => ({
  notes: state.notes,
  producerNotes: state.notes.filter(note => note.type === 'producer'),
  interviewerNotes: state.notes.filter(note => note.type === 'interviewer'),
});

const pluralize = (word, count) => {
  return `${word}${count === 1 ? '' : 's'}`;
};

class PausedMode extends Component {
  render() {
    const notesExist = this.props.notes.length > 0;
    const producerNoteCount = this.props.producerNotes.length;
    const interviewerNoteCount = this.props.interviewerNotes.length;

    const producerNoteCountSentence = `
      There ${producerNoteCount === 1 ? 'is' : 'are'}
      ${producerNoteCount}
      producer ${pluralize('note', producerNoteCount)}`;

    const interviewerNoteCountSentence = `
      and ${interviewerNoteCount}
      interviewer ${pluralize('note', interviewerNoteCount)}`;

    return (
      <Modal>
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
        </Actions>
      </Modal>
    );
  }
}

export default connect(
  mapStateToProps
)(PausedMode);

const Actions = styled('div')`
  > * {
    margin-top: 24px;
  }
`;
