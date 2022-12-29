import React from 'react';
import ReactDOM from 'react-dom/client';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import MyRouter from './router';
import { store, history, persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <MyRouter />
      </Router>
    </PersistGate>
  </Provider>
)
