import React from 'react';
import styled from 'react-emotion';

const pad = (n) => n < 10 ? `0${n}` : n;

const BigClock = (props) => {
  const date = new Date(props.time * 1000);
  const minutes = `${pad(date.getUTCMinutes())}m`;
  const seconds = `${pad(date.getUTCSeconds())}s`;

  return (
    <Monospace>
      {minutes}{'\u2005'}<Deemphasized>{seconds}</Deemphasized>
    </Monospace>
  );
};

export default BigClock;

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
