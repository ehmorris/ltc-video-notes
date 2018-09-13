import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProducerNote, addInterviewerNote } from './actions';
import WritingSurface from './WritingSurface';
import InterviewerNotes from './InterviewerNotes';
import ProducerNotes from './ProducerNotes';
import styled from 'react-emotion';

const mapStateToProps = state => ({
  time: state.time,
});

const Grid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: calc(100vh - 88px);
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Column = styled('div')`
  display: flex;
  flex-direction: column;
`;

const FullHeight = styled('div')`
  flex: 1;
  overflow: scroll;
`;

class ForProducer extends Component {
  constructor(props) {
    super(props);

    this.onProducerNote = this.onProducerNote.bind(this);
    this.onInterviewerNote = this.onInterviewerNote.bind(this);
  }

  onProducerNote(note) {
    this.props.dispatch(
      addProducerNote(note.timeStart, note.timeEnd, note.note)
    );
  }

  onInterviewerNote(note) {
    this.props.dispatch(
      addInterviewerNote(note.timeStart, note.timeEnd, note.note)
    );
  }

  render() {
    return (
      <Grid>
        <Column>
          <FullHeight>
            <ProducerNotes />
          </FullHeight>
          <WritingSurface
            onAddedNote={this.onProducerNote}
            time={this.props.time}
            label="Private Notes For Producer"
          />
        </Column>
        <Column>
          <FullHeight>
            <InterviewerNotes />
          </FullHeight>
          <WritingSurface
            onAddedNote={this.onInterviewerNote}
            time={this.props.time}
            label="Notes For Interviewer"
          />
        </Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps
)(ForProducer);
