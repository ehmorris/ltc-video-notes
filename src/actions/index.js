export const updateTime = time => ({
  type: 'UPDATE_TIME',
  time
});

export const addInterviewerNote = (timeStart, timeEnd, note) => ({
  type: 'ADD_INTERVIEWER_NOTE',
  timeStart: timeStart,
  timeEnd: timeEnd,
  note
});

export const addProducerNote = (timeStart, timeEnd, note) => ({
  type: 'ADD_PRODUCER_NOTE',
  timeStart: timeStart,
  timeEnd: timeEnd,
  note
});
