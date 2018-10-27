import React, { Component } from 'react';
import styled from 'react-emotion';
import BigClock from './BigClock';
import { Textfit } from '@wootencl/react-textfit';

const sortByTimeDesc = (note1, note2) => {
  return note2.timeStart - note1.timeStart;
}

class InterviewerMode extends Component {
  constructor(props) {
    super(props);

    this.sortAndFilterNotes();
  }

  logReady() {
    console.log('ready');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notes.length !== this.props.notes.length) {
      this.sortAndFilterNotes();
    }
  }

  sortAndFilterNotes() {
    this.latestNotes = this.props.notes.filter(note => note.type === 'interviewer').sort(sortByTimeDesc);
  }

  render() {
    const latestNoteIsNotAction = this.latestNotes.length > 0 && !this.latestNotes[0].action;

    return (
      <Screen>
        <ClockSize displaySmall={latestNoteIsNotAction}>
          <Textfit min={40} max={1000} mode="single" onReady={this.logReady}>
            <BigClock />
          </Textfit>
        </ClockSize>

        {latestNoteIsNotAction &&
          <PromptTextFit min={40} max={1000}>
            {this.latestNotes[0].note}
          </PromptTextFit>
        }
      </Screen>
    );
  }
}

export default InterviewerMode;

const Screen = styled('div')`
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #fff;
  padding: 48px;
  overflow: hidden;
  user-select: none;
`;

const ClockSize = styled('div')`
  height: ${props => props.displaySmall ? 'calc(15vh - 24px)' : 'calc(100vh - 48px)'};

  * { height: 100%; }
`;

const PromptTextFit = styled(Textfit)`
  line-height: 1;
  height: calc(85vh - 24px);
  font-weight: 600;
  white-space: pre-wrap;
`;
