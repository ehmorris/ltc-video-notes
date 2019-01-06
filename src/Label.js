import React from 'react';
import styled from 'react-emotion';

const Label = ({ children }) => {
  return (
    <LabelContainer>
      {children}
    </LabelContainer>
  );
};

export default Label;

const LabelContainer = styled('div')`
  font-size: 14px;
  line-height: 1.6;
`;
