import React from 'react';
import ReactDOM from 'react-dom/client';
import Message from './components/Message';
import './layout/css/style.css'

function App() {
    const name = "Anna";
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <Message name={name} />
        </React.StrictMode>
    );
}

App()
