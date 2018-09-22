import React from 'react';
import styled from 'react-emotion';
import { Spring, animated } from 'react-spring';

const Modal = ({style, children}) => {
  return (
    <ModalContainer
      {...style}
    >{children}</ModalContainer>
  );
}

const AnimatedModal = ({children}) => {
  return (
    <Spring
      from={{ opacity: .5, scale: .96 }}
      to={{ opacity: 1, scale: 1 }}
      config={{ duration: 200 }}
    >
      {styles => <Modal style={styles} children={children} /> }
    </Spring>
  );
}

export default AnimatedModal;

const ModalContainer = styled(animated.div)`
  opacity: ${props => props.opacity};
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
  transform: scale(${props => props.scale}) translate3d(-50%, -50%, 0);
  transform-origin: bottom left;
  justify-content: space-between;
`;
