import React from 'react';
import WritingSurface from './WritingSurface';
import { animated } from 'react-spring';

const InterviewerModePrompt = (props) => {
  return (
    <animated.div style={{
      opacity: props.style.opacity,
      transform: props.style.scale.interpolate(s => `scale(${s})`),
      ...interviewerNotePrompt
    }}>
      <WritingSurface
        onAddedNote={props.onAddedNote}
        time={props.time}
        label={props.label}
      />
    </animated.div>
  );
}

export default InterviewerModePrompt;

const interviewerNotePrompt = {
  border: '1px solid #000',
  padding: '24px',
  position: 'absolute',
  width: '100%',
  height: '100%',
};
