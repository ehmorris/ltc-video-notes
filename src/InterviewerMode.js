import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import BigClock from './BigClock';
import { Textfit } from '@wootencl/react-textfit';

const sortByTimeDesc = (note1, note2) => note2.timeStart - note1.timeStart;

const mapStateToProps = state => ({
  notes: state.notes,
});

class InterviewerMode extends Component {
  constructor(props) {
    super(props);

    this.state = this.sortAndFilterNotes();
  }


  componentDidUpdate(prevProps) {
    if (prevProps.notes.length !== this.props.notes.length) {
      this.setState(this.sortAndFilterNotes());
    }
  }

  sortAndFilterNotes() {
    return {
      latestNotes: this.props.notes.filter(note => note.type === 'interviewer').sort(sortByTimeDesc),
    }
  }

  render() {
    const latestNoteIsNotAction = this.state.latestNotes.length > 0 && !this.state.latestNotes[0].action;

    return (
      <Screen>
        <ClockSize displaySmall={latestNoteIsNotAction}>
          <Textfit min={40} max={1000} mode="single">
            <BigClock />
          </Textfit>
        </ClockSize>

        {latestNoteIsNotAction &&
          <PromptTextFit min={40} max={1000}>
            {this.state.latestNotes[0].note}
          </PromptTextFit>
        }
      </Screen>
    );
  }
}

export default connect(
  mapStateToProps
)(InterviewerMode);

const Screen = styled('div')`
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #fff;
  padding: 48px;
  overflow: hidden;
  user-select: none;
`;

const ClockSize = styled('div')`
  height: ${props => props.displaySmall ? 'calc(15vh - 24px)' : 'calc(100vh - 48px)'};

  * { height: 100%; }
`;

const PromptTextFit = styled(Textfit)`
  line-height: 1;
  height: calc(85vh - 24px);
  font-weight: 600;
  white-space: pre-wrap;
`;
