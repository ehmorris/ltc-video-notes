import React, { Component } from 'react';
import styled from 'react-emotion';
import BigClock from './BigClock';
import LatestInterviewerNote from './LatestInterviewerNote';

class InterviewerMode extends Component {
  constructor(props) {
    super(props);

    this.sizeNote = this.sizeNote.bind(this);

    this.state = {
      fontSize: '24vw',
    }
  }

  sizeNote(length) {
    let fontSize = '24vw';

    if (length > 10) fontSize = '18vw';
    if (length > 15) fontSize = '14vw';
    if (length > 20) fontSize = '12vw';
    if (length > 30) fontSize = '8vw';

    this.setState({
      fontSize: fontSize,
    });
  }

  render() {
    return (
      <Screen>
        <BigClock />
        <PromptType fontSize={this.state.fontSize}>
          <LatestInterviewerNote />
        </PromptType>
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 48px;
  overflow: hidden;
`;

const PromptType = styled('div')`
  font-size: ${props => props.fontSize};
  line-height: ${props => props.fontSize};
  font-weight: 600;

  &:empty {
    display: none;
  }
`;
