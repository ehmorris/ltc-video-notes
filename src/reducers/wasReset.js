const wasReset = (state = [], action) => {
  switch (action.type) {
    case 'RESET':
      return true;
    case 'UNRESET':
      return false;
    default:
      return state;
  }
};

export default wasReset;
