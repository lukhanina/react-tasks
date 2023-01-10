import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { profileReducer } from './profileReducer';
import { msgReducer } from './msgReducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router']
}

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

const rootReducer = combineReducers({ 
  router: routerReducer,
  msg: msgReducer,
  profile: profileReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk, routerMiddleware]
});

export const history = createReduxHistory(store);

export const persistor = persistStore(store)
