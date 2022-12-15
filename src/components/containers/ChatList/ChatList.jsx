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
    
export function ChatList(props) {
  const chats = props.chats;

  const chatsList = Object.keys(chats).map(key => {
    return (
      <NavLink 
        className='w-100'
        to={`/chats/${key}`} key={key}
        style={({ isActive}) => ({
          backgroundColor: isActive? '#444a57' : ''
        })}>
        <ListItem >
          <ListItemAvatar>
            <Avatar alt={'Profile' + key} src={chats[key]?.avatar} />
          </ListItemAvatar>
          <ListItemText primary={chats[key]?.chatName} secondary={chats[key]?.messages[chats[key].messages.length - 1]?.text} />
        </ListItem>
      </NavLink>
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
