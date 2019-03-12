import { combineReducers } from 'redux';
import metadata from './metadata';
import time from './time';
import notes from './notes';
import wasReset from './wasReset';

export default combineReducers({
  metadata,
  time,
  notes,
  wasReset
});
