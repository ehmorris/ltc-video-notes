import React, { Component } from 'react';
import styled from 'react-emotion';
import BigClock from './BigClock';
import { Textfit } from '@wootencl/react-textfit';

const sortByTimeAndParentDesc = (note1, note2) => {
  return note2.timeStart - note1.timeStart;
}

class InterviewerMode extends Component {
  render() {
    const latestNotes = this.props.notes.filter(note => note.type === 'interviewer').sort(sortByTimeAndParentDesc);
    const noteExists = latestNotes.length > 0 && !latestNotes[0].action;

    return (
      <Screen>
        <ClockSize min={40} max={1000} noteExists={noteExists}>
          <BigClock time={this.props.time} />
        </ClockSize>

        {noteExists &&
          <PromptTextFit min={40} max={1000}>
            {latestNotes[0].note}
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

const ClockSize = styled(Textfit)`
  height: ${props => props.noteExists ? 'calc(15vh - 24px)' : 'calc(100vh - 48px)'};

  * { height: 100%; }
`;

const PromptTextFit = styled(Textfit)`
  line-height: 1;
  height: calc(85vh - 24px);
  font-weight: 600;
  white-space: pre-wrap;
`;
