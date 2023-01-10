import React from 'react';
import './style.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function Header() {
  return (
    <div id='header'>
      <Link to={'/chats'}>
        <ChatIcon id='msg-icon'/>
      </Link>
      <Link to={'/profile'}>
        <AccountCircleIcon id='account-icon' />
      </Link>
      <Link to={'/addChat'}>
        <AddIcon id='account-icon' />
      </Link>        
    </div>
  )
}
