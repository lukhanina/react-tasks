import React from 'react';
import ReactDOM from 'react-dom/client';
import './layout/css/style.css';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from './components/containers/MessageList/MessageList'

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <App />
)
