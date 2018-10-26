import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInterviewerNote, clearInterviewerNotes } from './actions';
import InterviewerModePreview from './InterviewerModePreview';
import InterviewerModePrompt from './InterviewerModePrompt';
import styled from 'react-emotion';
import { Transition } from 'react-spring';

const sortByTimeDesc = (note1, note2) => note2.timeStart - note1.timeStart;

const mapStateToProps = state => ({
  time: state.time,
  interviewerNotesWithActions: Array.from(state.notes.filter(note => note.type === 'interviewer')).sort(sortByTimeDesc),
});

class InterviewerModePreviewAndPrompt extends Component {
  constructor(props) {
    super(props);

    this.onClearPrompt = this.onClearPrompt.bind(this);
    this.onInterviewerNote = this.onInterviewerNote.bind(this);
  };

  onClearPrompt() {
    this.props.dispatch(
      clearInterviewerNotes(this.props.time, this.props.time)
    );
  }

  onInterviewerNote(note) {
    this.props.dispatch(
      addInterviewerNote(note.timeStart, note.timeEnd, note.note)
    );
  }

  render() {
    const latestNoteIsNotAction = this.props.interviewerNotesWithActions.length > 0 && !this.props.interviewerNotesWithActions[0].action;

    return (
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
                interviewerNotesWithActions={this.props.interviewerNotesWithActions}
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
    );
  }
}

export default connect(
  mapStateToProps
)(InterviewerModePreviewAndPrompt);

const InterviewerBox = styled('div')`
  width: 100%;
  height: 300px;
  position relative;
  margin-bottom: 24px;
`;
