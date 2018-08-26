import { combineReducers } from 'redux';
import time from './time';
import notes from './notes';

export default combineReducers({
  time,
  notes
});
