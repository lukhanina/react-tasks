import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import msgReducer from './slices/msgSlice';
import { profileReducer } from './profileReducer';

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    msg: msgReducer,
    profile: profileReducer
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);
