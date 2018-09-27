import React from 'react';
import Modal from './Modal';
import Label from './Label';

const UninitializedMode = ({style}) => {
  return (
    <Modal style={style}>
      <div>First click “Begin recording”, and you’ll see producer mode, then open a new window and it’ll automatically turn into interviewer mode.</div>
      <Label>30 minutes of timecode; 23.976fps; 48 Khz sample rate; 8 bit unsigned int bit depth.</Label>
    </Modal>
  );
}

export default UninitializedMode;
