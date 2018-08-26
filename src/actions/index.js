export const updateTime = time => ({
  type: 'UPDATE_TIME',
  time
});

export const addInterviewerNote = (time, note) => ({
  type: 'ADD_INTERVIEWER_NOTE',
  time: time,
  note
});

export const addProducerNote = (time, note) => ({
  type: 'ADD_PRODUCER_NOTE',
  time: time,
  note
});
