import React, {useEffect, useState} from 'react';
import './style.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { NavLink, Outlet } from 'react-router-dom';
import { delChat, loadMsg } from '../../../store/msgReducer';
import { useDispatch, useSelector } from 'react-redux';
import { get, remove, ref } from 'firebase/database';
import { chatsRef, db } from '../../../../services/firebase';
import './avatar/robot.png';
import './avatar/girl.jpg';
    
export function ChatList() {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.msg);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchMsg = async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await get(chatsRef);
      const data = snapshot.val();
      dispatch(loadMsg(data))
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMsg();
  }, [])

  const deleteChat = async(chatId) => {
    setLoading(true);
    setError(null);
    try {
      remove(ref(db, '/chats/' + chatId));
      dispatch(delChat(chatId))
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
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
    <>
      <Box sx={{ pb: 7 }} className='chat-list'>
        <CssBaseline />
        {loading && <h2 className='absolute'>Loading ... </h2>}
        {error && (<div className='absolute' >
          <h2 style={{color: 'red'}}>Sorry, error occured {error} </h2>
          <button onClick={fetchMsg}>Reload</button>
        </div>)}
        {chats && !error && !loading && (<List className='chats__list'>
          {chatsList}
        </List>)}
      </Box >
      <Outlet />
    </>
  );
}
