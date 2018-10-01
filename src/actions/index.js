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

export const clearInterviewerNotes = () => ({
  type: 'CLEAR_INTERVIEWER_NOTES'
});

let noteId = 0;

export const addProducerNote = (timeStart, timeEnd, note) => ({
  type: 'ADD_PRODUCER_NOTE',
  id: noteId++,
  timeStart: timeStart,
  timeEnd: timeEnd,
  note
});
