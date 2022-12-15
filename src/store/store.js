import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from "./reducers/index";
import middlewares from '../middlewares';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { msgReducer } from './reducers/msg_reducer';
import { combineReducers } from 'redux';

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    msgReducer
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware, ...middlewares),
});

export const history = createReduxHistory(store);