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
import { delChat } from '../../../store/msgReducer';
import { useDispatch } from 'react-redux';
import './static/images/avatar/girl.jpg';
import './static/images/avatar/robot.png'
    
export function ChatList(props) {
  const chats = props.chats;
  const dispatch = useDispatch();

  const deleteChat = (chatId) => {
    return fetch(`/api/deleteChat/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (!res.ok) {
          alert(`Network response was not OK, error ${res.status}`)
        }})
      .then(dispatch(delChat(chatId)))
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
      <List className='chats__list'>
        {chatsList}
      </List>
    </Box >
  );
}
