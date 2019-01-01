import uuidv4 from 'uuid/v4';

export const updateTime = time => ({
  type: 'UPDATE_TIME',
  time
});

export const addInterviewerNote = (timeStart, timeEnd, note) => ({
  type: 'ADD_INTERVIEWER_NOTE',
  id: uuidv4(),
  timeStart: timeStart,
  timeEnd: timeEnd,
  note
});

export const clearInterviewerNotes = (timeStart, timeEnd) => ({
  type: 'CLEAR_INTERVIEWER_NOTES',
  timeStart: timeStart,
  timeEnd: timeEnd
});

export const addProducerNote = (timeStart, timeEnd, note) => ({
  type: 'ADD_PRODUCER_NOTE',
  id: uuidv4(),
  timeStart: timeStart,
  timeEnd: timeEnd,
  note
});

export const addNestedProducerNote = (timeStart, timeEnd, note, parentId) => ({
  type: 'ADD_NESTED_PRODUCER_NOTE',
  id: uuidv4(),
  parentId: parentId,
  timeStart: timeStart,
  timeEnd: timeEnd,
  note
});

export const reset = () => ({
  type: 'RESET'
});

export const unReset = () => ({
  type: 'UNRESET'
});
