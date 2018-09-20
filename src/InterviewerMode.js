import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import BigClock from './BigClock';
import { Textfit } from 'react-textfit';

const mapStateToProps = state => ({
  latestNotes: state.notes.filter(note => note.type === 'interviewer').reverse(),
});

class InterviewerMode extends Component {
  render() {
    return (
      <Screen>
        <BigClock />

        {this.props.latestNotes.length > 0 && !this.props.latestNotes[0].action &&
          <PromptType>
            <Textfit
              min={40}
              max={1000}
            >
              {this.props.latestNotes[0].note}
            </Textfit>
          </PromptType>
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 48px;
  overflow: hidden;
`;

const PromptType = styled('div')`
  flex: 1;
  line-height: 1.2;
  font-weight: 600;
  white-space: pre-wrap;

  &:empty {
    display: none;
  }
`;
