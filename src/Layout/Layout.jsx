import React, { useEffect } from 'react';
import './css/style.css'
import { ChatList } from '../components/containers/ChatList/ChatList';
import Header from '../components/Header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Outlet, useParams } from 'react-router-dom';
import { loadMsg } from '../store/slices/msgSlice';


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


export function Layout() {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.msg);
  const messageList = chats[+chatId]?.messages || chats[Object.keys(chats).length]?.messages;

  const fetchMsg = () => {
    return fetch('/api/getMessages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert(`Network response was not OK, error ${response.status}`)
        }
        return response.json()})
      .then((data) => {
        dispatch(loadMsg(data))
      })
  }

  useEffect(() => {
    fetchMsg();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ChatList chats={chats} />
      <Outlet context={[chatId, messageList]}/>
    </ThemeProvider>
  )
}
