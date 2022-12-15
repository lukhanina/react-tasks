import React, { useEffect } from 'react';
import './css/style.css'
import { ChatList } from '../components/containers/ChatList/ChatList';
import Header from '../components/Header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MessageList } from '../components/containers/MessageList/MessageList';
import { connect } from 'react-redux/es/exports';
import { send } from '../store/actions/msg_action';
import { loadChats } from '../store/actions/msg_action'
import { bindActionCreators } from 'redux';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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


function Layout(props) {
  const { chatId } = useParams();
  const chats = props.chats;
  const send = props.send;
  const messageList = chats[+chatId]?.messages || chats[Object.keys(chats).length]?.messages
  useEffect(() => {
    props.loadChats();
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ChatList chats={chats} />
      <Outlet context={[chatId, messageList, send]}/>
    </ThemeProvider>
  )
}

const mapStateToProps = ({ msgReducer }) =>
  ({
    chats: msgReducer
  })

const mapDispatchToProps = dispatch => bindActionCreators({ send, loadChats }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
