import React from 'react';
import LatestNote from './LatestNote';
import Label from './Label';
import Button from './Button';
import { animated } from 'react-spring';
import styled from 'react-emotion';

const InterviewerModePreview = (props) => {
  return (
    <animated.div style={{
      opacity: props.style.opacity,
      transform: props.style.scale.interpolate(s => `scale(${s})`),
      ...preview
    }}>
      <UrgentLabels>
        <Label>Live on the prompt</Label>
        <Label>
          <Button onClick={props.onClearPrompt}>
            Clear prompt
          </Button>
        </Label>
      </UrgentLabels>
      <LatestNote notes={props.latestNote} />
    </animated.div>
  );
}

export default InterviewerModePreview;

const preview = {
  border: '1px solid red',
  padding: '24px',
  position: 'absolute',
  width: '100%',
  height: '100%',
};

const UrgentLabels = styled('div')`
  display: flex;
  margin-bottom: .35rem;
  justify-content: space-between;
  width: 100%;
  color: rgb(255, 0, 0);
`;
