import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { actionStorageMiddleware, createStorageListener } from 'redux-state-sync';
import rootReducer from './reducers';
import App from './App';
import './index.css';

const persistConfig = {
  key: 'root',
  storage,
};

const middlewares = [
  actionStorageMiddleware,
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, {}, applyMiddleware(...middlewares))
const persistor = persistStore(store);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

createStorageListener(store);
