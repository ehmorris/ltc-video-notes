import React from 'react';
import { animated } from 'react-spring';

const Modal = ({style, children}) => {
  return (
    <animated.div
      style={{...style, ...modalContainer}}
    >
      {children}
    </animated.div>
  );
}

export default Modal;

const modalContainer = {
  position: 'absolute',
  width: '500px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #000',
  background: '#fff',
  padding: '48px',
  left: '50%',
  top: '50%',
  transformOrigin: 'bottom left',
  justifyContent: 'space-between',
};
