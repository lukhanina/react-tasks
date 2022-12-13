import React from 'react';
import ReactDOM from 'react-dom/client';
import './layout/css/style.css';
import { ChatList } from './components/containers/ChatList/ChatList';
import { MessageList } from './components/containers/MessageList/MessageList';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#444a57',
            light: '#5e697f',
            dark: '#282c34',
            contrastText: '#eceff1'
        },
    }
})

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <ThemeProvider theme={theme}>
        <ChatList />
        <MessageList />
    </ThemeProvider>
)
