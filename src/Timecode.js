import React from 'react';

const pad = (n) => n < 10 ? `0${n}` : n;

const Timecode = ({time}) => {
  const date = new Date(time * 1000);
  const formattedTime = [
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
    (((date.getUTCMilliseconds() / 1000) * .23976) + 1).toFixed(2).slice(2, 5),
  ].join(':');

  return (
    <span>{formattedTime}</span>
  );
}

export default Timecode;
