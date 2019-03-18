import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { createStateSyncMiddleware } from 'redux-state-sync';
import appReducer from './reducers';
import App from './App';
import './index.css';

const persistConfig = {
  key: 'root',
  storage
};

const syncConfig = {
  channel: 'ltc_video_notes_redux_channel',
  broadcastChannelOption: { type: 'localstorage' }
};

const middlewares = [
  createStateSyncMiddleware(syncConfig)
];

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = {
      metadata: [],
      time: 0,
      notes: [],
      wasReset: true
    };

    return state;
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, {}, applyMiddleware(...middlewares));
const persistor = persistStore(store);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
