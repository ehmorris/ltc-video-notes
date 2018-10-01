import React from 'react';
import Label from './Label';
import styled from 'react-emotion';

const UninitializedMode = ({style}) => {
  return (
    <Container>
      <div>First click “Begin recording”, and you’ll see producer mode, then open a new window and it’ll automatically turn into interviewer mode.</div>
      <Label>30 minutes of timecode; 23.976fps; 48 Khz sample rate; 8 bit unsigned int bit depth.</Label>
    </Container>
  );
}

export default UninitializedMode;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;
