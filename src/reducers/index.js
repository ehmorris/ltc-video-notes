import { combineReducers } from 'redux';
import time from './time';
import notes from './notes';
import wasReset from './wasReset';

export default combineReducers({
  time,
  notes,
  wasReset
});
