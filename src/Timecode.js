import React from 'react';
import SMPTETimecode from 'smpte-timecode';

const Timecode = ({time}) => {
  let dateObject = new Date();
  dateObject.setHours(0, 0, 0);
  dateObject.setMilliseconds(time * 1000);

  const formattedTime = new SMPTETimecode(dateObject, 23.976).toString();

  return (
    <span>{formattedTime}</span>
  );
}

export default Timecode;
