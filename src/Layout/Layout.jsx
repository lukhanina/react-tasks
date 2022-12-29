import React, { useEffect } from 'react';
import './css/style.css'
import { ChatList } from '../components/MainPage/ChatList/ChatList';
import Header from '../components/MainPage/components/Header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Outlet, useParams } from 'react-router-dom';
import { loadMsg, loading, errMsg } from '../store/msgReducer';

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
  const { chats, status, error } = useSelector((state) => state.msg);
  const messageList = chats[+chatId]?.messages || chats[Object.keys(chats).length]?.messages;

  const fetchMsg = async () => {
    dispatch(loading(true))
    try {
      const res = await fetch('/api/getMessages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch(loadMsg(data));
    } catch (error) {
      dispatch(errMsg(error.message))
    } finally {
      dispatch(loading(false))
    }
  }

  useEffect(() => {
    fetchMsg();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ChatList chats={chats} status={status} error={error} fetchMsg={fetchMsg}/>
      <Outlet context={[chatId, messageList, status, error]}/>
    </ThemeProvider>
  )
}
