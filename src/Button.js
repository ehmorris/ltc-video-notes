import React from 'react';
import styled from 'react-emotion';

const Button = ({onClick, children, disabled = false, type = 'default'}) => {
  return (
    <div>
      {disabled &&
        <DisabledButtonContainer>
          {children}
        </DisabledButtonContainer>
      }

      {!disabled &&
        <ButtonContainer onClick={onClick}>
          {children}
        </ButtonContainer>
      }
    </div>
  );
}

export default Button;

const ButtonContainer = styled('div')`
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  color: inherit;

  :hover {
    text-shadow: -3px 5px 12px rgba(0, 255, 0, .1);
  }
`;

const DisabledButtonContainer = styled('div')`
  font-weight: 600;
  cursor: not-allowed;
  user-select: none;
  text-decoration: none;
  color: inherit;
  opacity: .25;

  > * {
    pointer-events: none;
  }
`;
