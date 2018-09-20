import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import BigClock from './BigClock';
import { Textfit } from '@wootencl/react-textfit';

const mapStateToProps = state => ({
  latestNotes: state.notes.filter(note => note.type === 'interviewer').reverse(),
});

class InterviewerMode extends Component {
  render() {
    const noteExists = this.props.latestNotes.length > 0 && !this.props.latestNotes[0].action;
    return (
      <Screen>
        <ClockSize min={40} max={1000} noteExists={noteExists}>
          <BigClock />
        </ClockSize>

        {noteExists &&
          <PromptTextFit min={40} max={1000}>
            {this.props.latestNotes[0].note}
          </PromptTextFit>
        }
      </Screen>
    );
  }
}

export default connect(
  mapStateToProps
)(InterviewerMode);

const Screen = styled('div')`
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #fff;
  padding: 48px;
  overflow: hidden;
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
