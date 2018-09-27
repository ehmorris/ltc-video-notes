import React from 'react';
import Modal from './Modal';

const UninitializedMode = ({style}) => {
  return (
    <Modal style={style}>
      <div>First click “Begin recording”, and you’ll see producer mode.</div>
      <div>Then open a new window and it’ll automatically turn into interviewer mode</div>
    </Modal>
  );
}

export default UninitializedMode;
