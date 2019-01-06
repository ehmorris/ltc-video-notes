import React from 'react';
import Label from './Label';
import styled from 'react-emotion';

const UninitializedMode = ({ style }) => {
  return (
    <Container>
      <div>First click “Begin recording”, and you’ll see producer mode, then open a new window and it’ll automatically turn into interviewer mode.</div>
      <Label>
        2h00m of runtime; No LTC will be transmitted.
        <br />
        <br />
        To fullscreen the new window in Chrome, press control+command+F, then shift+command+F to hide the toolbar.
      </Label>
    </Container>
  );
};

export default UninitializedMode;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;
