import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearInterviewerNotes } from './actions';
import LatestNote from './LatestNote';
import Label from './Label';
import Button from './Button';
import { animated } from 'react-spring';
import styled from 'react-emotion';

const mapStateToProps = state => ({
  time: state.time,
});

class InterviewerModePreview extends Component {
  constructor(props) {
    super(props);

    this.onClearPrompt = this.onClearPrompt.bind(this);
  }

  onClearPrompt() {
    this.props.dispatch(clearInterviewerNotes(this.props.time, this.props.time));
  }

  render() {
    return (
      <animated.div style={{
        opacity: this.props.style.opacity,
        transform: this.props.style.scale.interpolate(s => `scale(${s})`),
        ...preview
      }}>
        <UrgentLabels>
          <Label>Live on the prompt</Label>
          <Label>
            <Button onClick={this.onClearPrompt}>
              Clear prompt
            </Button>
          </Label>
        </UrgentLabels>
        <LatestNote notes={this.props.interviewerNotesWithActions} />
      </animated.div>
    );
  }
}

export default connect(
  mapStateToProps
)(InterviewerModePreview);

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
