import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Reset from './Reset';
import Download from './Download';
import Button from './Button';
import Modal from './Modal';

const mapStateToProps = state => ({
  notes: state.notes,
});


class PausedMode extends Component {
  filterNotesByString(filter) {
    return this.props.notes.filter(note => note.type === filter);
  }

  pluralize(word, count) {
    return `${word}${count > 1 ? 's' : ''}`;
  }

  render() {
    const notesExist = this.props.notes.length > 0;
    const producerNotesCount = this.filterNotesByString('producer').length;
    const interviewerNotesCount = this.filterNotesByString('interviewer').length;

    return (
      <Modal>
        {!notesExist &&
          <div>You haven’t made any notes yet.</div>
        }

        {notesExist &&
          <div>There {producerNotesCount > 1 ? 'are' : 'is'} {producerNotesCount} producer {this.pluralize('note', producerNotesCount)} and {interviewerNotesCount} interviewer {this.pluralize('note', interviewerNotesCount)}. Resume to view all notes.</div>
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
