import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnly';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { createWrapper } from 'next-redux-wrapper';

const middleware = [thunk];

const makeStore = (context) =>
  createStore(
    reducers,
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(...middleware))
      : applyMiddleware(...middleware)
  );

// const debug = process.env.NODE_ENV;
const debug = false;

export const wrapper = createWrapper(makeStore, { debug });
