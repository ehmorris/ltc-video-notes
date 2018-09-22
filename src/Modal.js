import React from 'react';
import styled from 'react-emotion';

const Modal = ({onClick, children, type = 'default'}) => {
  return (
    <ModalContainer>
      {children}
    </ModalContainer>
  );
}

export default Modal;

const ModalContainer = styled('div')`
  position: absolute;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  background: #fff;
  padding: 48px;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  justify-content: space-between;
`;
