const notes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_INTERVIEWER_NOTE':
      return [
        ...state,
        {
          type: 'interviewer',
          id: action.id,
          timeStart: action.timeStart,
          timeEnd: action.timeEnd,
          note: action.note
        }
      ];
    case 'CLEAR_INTERVIEWER_NOTES':
      return [
        ...state,
        {
          type: 'interviewer',
          action: 'clear',
          timeStart: action.timeStart,
          timeEnd: action.timeEnd
        }
      ];
    case 'ADD_PRODUCER_NOTE':
      return [
        ...state,
        {
          type: 'producer',
          id: action.id,
          timeStart: action.timeStart,
          timeEnd: action.timeEnd,
          note: action.note
        }
      ];
    case 'ADD_NESTED_PRODUCER_NOTE':
      return [
        ...state,
        {
          type: 'producer',
          id: action.id,
          parentId: action.parentId,
          timeStart: action.timeStart,
          timeEnd: action.timeEnd,
          note: action.note
        }
      ];
    default:
      return state;
  }
};

export default notes;
