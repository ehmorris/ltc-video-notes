import React from 'react';
import { Spring, animated } from 'react-spring';

const Modal = ({style, children}) => {
  return (
    <animated.div
      style={{...style, ...modalContainer}}
    >
      {children}
    </animated.div>
  );
}

const AnimatedModal = ({children}) => {
  return (
    <Spring
      from={{ opacity: .5, transform: 'scale(0.98) translate3d(-50%, -50%, 0)' }}
      to={{ opacity: 1, transform: 'scale(1) translate3d(-50%, -50%, 0)' }}
      config={{ duration: 200 }}
    >
      {styles => <Modal style={styles} children={children} /> }
    </Spring>
  );
}

export default AnimatedModal;

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
