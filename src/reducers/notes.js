const notes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_INTERVIEWER_NOTE':
      return [
        ...state,
        {
          type: 'interviewer',
          time: action.time,
          note: action.note
        }
      ];
    case 'ADD_PRODUCER_NOTE':
      return [
        ...state,
        {
          type: 'producer',
          time: action.time,
          note: action.note
        }
      ];
    default:
      return state;
  }
}

export default notes;
