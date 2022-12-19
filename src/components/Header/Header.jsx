import React, { Component } from 'react';
import './style.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div id='header'>
        <Link to={'/chats'}>
          <ChatIcon id='msg-icon'/>
        </Link>
        <Link to={'/profile'}>
          <AccountCircleIcon id='account-icon' />
        </Link>
      </div>
    )
  }
}
