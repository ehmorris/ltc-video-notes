import { combineReducers } from 'redux';
import time from './time';
import notes from './notes';

const wasReset = () => false;

export default combineReducers({
  time,
  notes,
  wasReset
});
