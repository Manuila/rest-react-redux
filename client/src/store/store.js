import { createStore } from 'redux';
import postReducer from '../reducers/postReducer';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  postReducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
