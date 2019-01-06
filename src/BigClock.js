import React from 'react';
import SMPTETimecode from 'smpte-timecode';
import { connect } from 'react-redux';
import styled from 'react-emotion';

const pad = (n) => n < 10 ? `0${n}` : n;

const mapStateToProps = state => ({
  time: state.time
});

const BigClock = ({ time }) => {
  let dateObject = new Date();
  dateObject.setHours(0, 0, 0);
  dateObject.setMilliseconds(time * 1000);

  const formattedTime = new SMPTETimecode(dateObject, 23.976);
  const minutes = pad(formattedTime.minutes);
  const seconds = pad(formattedTime.seconds);

  return (
    <Monospace>
      {minutes}m{'\u2005'}<Deemphasized>{seconds}s</Deemphasized>
    </Monospace>
  );
};

export default connect(
  mapStateToProps
)(BigClock);

const Monospace = styled('div')`
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  text-align: center;
  width: 100%;
  line-height: 1;
  white-space: nowrap;
`;

const Deemphasized = styled('span')`
  opacity: .25;
`;
