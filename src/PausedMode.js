import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Reset from './Reset';
import Download from './Download';

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
    const notesCount = this.props.notes.length;
    const producerNotesCount = this.filterNotesByString('producer').length;
    const interviewerNotesCount = this.filterNotesByString('interviewer').length;

    return (
      <div>
        {notesCount < 1 &&
          <Modal>
            There are no notes. Once you made notes, you’ll be able to download them here.

            <div>
              <Button>
                <Reset text="Reset timer" />
              </Button>
            </div>
          </Modal>
        }

        {notesCount > 1 &&
          <Modal>
            <div>
              There {producerNotesCount > 1 ? 'are' : 'is'} {producerNotesCount} producer {this.pluralize('note', producerNotesCount)} and {interviewerNotesCount} interviewer {this.pluralize('note', interviewerNotesCount)}. Resume to view all notes.
            </div>
            <div>
              <Button>
                <Download />
              </Button>
              <Button>
                <Reset text="Clear notes and reset" />
              </Button>
            </div>
          </Modal>
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(PausedMode);

const Modal = styled('div')`
  position: absolute;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  background: #fff;
  padding: 48px;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  justify-content: space-between;
`;

const Button = styled('div')`
  font-weight: 600;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  margin-top: 24px;
`;
