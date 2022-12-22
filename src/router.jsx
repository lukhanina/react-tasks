import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MessageList } from './components/containers/MessageList/MessageList';
import Profile from './components/Profile/Profile';
import { Layout } from './Layout/Layout';
import AddChat from './components/containers/AddChat/AddChat';

export default class Router extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="chats" >
            <Route path=":chatId" element={<MessageList />}/>
          </Route>
          <Route path="profile" element={<Profile />}/>
          <Route path="addChat" element={<AddChat />}/>
        </Route>
        <Route path="*" element={<h1>Sorry, page not found</h1>} />
      </Routes>
    )
  }
}
