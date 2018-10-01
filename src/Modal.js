import React from 'react';
import { animated } from 'react-spring';
import { Transition } from 'react-spring';

const ModalWrapper = ({style, children}) => {
  return (
    <animated.div
      style={{
        opacity: style.opacity,
        transform: style.scale.interpolate(s => `scale(${s}) translate3d(-50%, -50%, 0)`),
        ...modalWrapper
      }}
    >
      {children}
    </animated.div>
  );
}

const Modal = ({showOn, children}) => {
  return (
    <Transition
      native
      from={{ opacity: .5, scale: 0.98 }}
      enter={{ opacity: 1, scale: 1 }}
      leave={{ opacity: 0, scale: 0.98 }}
    >
      {showOn && (style => <ModalWrapper style={style} children={children} />)}
    </Transition>
  );
}

export default Modal;

const modalWrapper = {
  position: 'absolute',
  width: '500px',
  height: '500px',
  border: '1px solid #000',
  background: '#fff',
  padding: '48px',
  left: '50%',
  top: '50%',
  transformOrigin: 'bottom left',
};
