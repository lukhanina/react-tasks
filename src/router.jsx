import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MessageList } from './components/MessagesPage/MessageList/MessageList';
import Profile from './components/Profile/Profile';
import { ChatList } from './components/MainPage/ChatList/ChatList';
import AddChat from './components/MainPage/AddChat/AddChat';
import { Layout } from './Layout/Layout';
import { AuthPage } from './components/Auth/AuthPage';
import { useSelector } from 'react-redux/es';

export default function Router () {
  const isAuth = useSelector((state) => state.profile.isAuth);

  return (
    <Routes>
      <Route path="/" element={isAuth? <Layout /> : <AuthPage/>}>
        <Route index element={<ChatList />}/>
        <Route path="chats" element={<ChatList />}>
          <Route path=":chatId" element={<MessageList />}/>
        </Route>
        <Route path="profile" element={<Profile />}/>
        <Route path="addChat" element={<AddChat />}/>
      </Route>
      <Route path="*" element={<h1>Sorry, page not found</h1>} />
    </Routes>
  )
}
