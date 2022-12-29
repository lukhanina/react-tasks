import React from 'react';
import './style.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { delChat, errMsg, loading } from '../../../store/msgReducer';
import { useDispatch } from 'react-redux';
import './avatar/robot.png';
import './avatar/girl.jpg';
    
export function ChatList({chats, status, error, fetchMsg}) {
  const dispatch = useDispatch();

  const deleteChat = async(chatId) => {
    dispatch(loading(true))
    try {
      const res = await fetch(`/api/deleteChat/${chatId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (res.ok) {
        dispatch(delChat(chatId))
      }
    } catch (error) {
      dispatch(errMsg(error.message))
    } finally {
      dispatch(loading(false))
    }
  }

  const chatsList = Object.keys(chats).map(key => {
    return (
      <ListItem 
        className='w-100' key={key}>
        <NavLink 
          to={`/chats/${key}`} 
          style={({ isActive }) => ({
            backgroundColor: isActive? '#444a57' : '' })} className='w-60'>
          <ListItemAvatar>
            <Avatar 
              alt={'Profile' + key} 
              src={chats[key]?.avatar} />
          </ListItemAvatar>
          <ListItemText 
            primary={chats[key]?.contactName} secondary={chats[key]?.messages[chats[key].messages.length - 1]?.text} 
            className='p-10' />
        </NavLink>
        <button 
          className='del-chat'
          onClick={() => deleteChat(key)}
        >&times;
        </button>
      </ListItem>
    )
  }
  )

  return (
    <Box sx={{ pb: 7 }} className='chat-list'>
      <CssBaseline />
      {status && <h2 className='absolute'>Loading ... </h2>}
      {error && (<div className='absolute' >
        <h2 style={{color: 'red'}}>Sorry, error occured {error} </h2>
        <button onClick={fetchMsg}>Reload</button>
      </div>)}
      {chats && !error && !status && (<List className='chats__list'>
        {chatsList}
      </List>)}
    </Box >
  );
}
