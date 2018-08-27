const time = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_TIME':
      return action.time;
    default:
      return state;
  }
};

export default time;
