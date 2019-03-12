const metadata = (state = [], action) => {
  switch (action.type) {
    case 'SET_METADATA':
      return {
        timeOfDayInitialized: action.timeOfDayInitialized,
        userAgent: action.userAgent,
        connectionInfo: action.connectionInfo
      };
    default:
      return state;
  }
};

export default metadata;
