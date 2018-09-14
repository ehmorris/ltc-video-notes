import React, { Component } from 'react';
import styled from 'react-emotion';
import BigClock from './BigClock';
import LatestInterviewerNote from './LatestInterviewerNote';

class ForInterviewer extends Component {
  render() {
    return (
      <Screen>
        <BigClock />
        <PromptType>
          <LatestInterviewerNote />
        </PromptType>
      </Screen>
    );
  }
}

export default ForInterviewer;

const Screen = styled('div')`
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px;
`;

const PromptType = styled('div')`
  font-size: 9rem;
  line-height: 9rem;
  font-weight: 600;
`;
