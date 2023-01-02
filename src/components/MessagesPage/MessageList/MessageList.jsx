import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Message from '../components/Message/Message';
import Send from '../components/Send/Send';
import './style.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMsg } from '../../../store/msgReducer';
import { ref, update } from 'firebase/database';
import { db } from '../../../../services/firebase';

export function MessageList() {
  const { chatId } = useParams();
  const { chats } = useSelector((state) => state.msg);
  const messageList = chats[chatId]?.messages || chats[Object.keys(chats).length]?.messages;
  const dispatch = useDispatch();
  const byEnter = useSelector((state) => state.profile.byEnter);
  const mesRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = (event) => {
    event.preventDefault();
    const el = document.querySelector('#reply');
    el.value ? addMess(chatId, 'Anna Lukhanina', 2, el.value, 'sent') : '';
    el.value = '';
  }

  const handleChange = (event) => {
    if (event.code === 'Enter' && event.shiftKey) {} 
    else if (event.code === 'Enter' && byEnter) {
      sendMessage(event)
    }
  }

  const addMess = async (chatId, name, id, text, mesType) => {
    const newMsg = {
      author: {
        name: name || 'Bot',
        id: id || 1
      },
      id: `${chatId}_${chats[chatId].messages.length + 1}`,
      text: text || 'I\'m Bot',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString('en-GB').substring(0, 5),
      type: mesType || 'received'
    };
    setLoading(true);
    setError(null);
    try {
      const updates = {};
      const lastMessage = chats[chatId].messages.length;
      updates['/chats/' + `${chatId}/messages/${[lastMessage]}`] = newMsg;
      update(ref(db), updates);
      dispatch(addNewMsg({ newMsg, chatId }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }

  const listMessage = messageList?.map((el, idx) => {
    if (idx === messageList?.length - 1 && messageList[idx]) {
      return (
        <Message mesRef={mesRef} message={el} key={idx + 1} />)
    }
    else if (messageList[idx]) {
      return (
        <Message message={el} key={idx + 1} />)
    }
  });

  useLayoutEffect(() => {
    const timer = setTimeout(() =>
      mesRef?.current?.scrollIntoView(), 100);
  }, [messageList]);

  useEffect(() => {
    if (messageList[messageList.length - 1].author.id !== 1) {
      const timer = setTimeout(() =>
        addMess(chatId), 1000);
      return () => {
        clearTimeout(timer)
      }
    }}, [messageList]);

  return (
    <div className='message-list'>
      {loading && <h2 className='absolute'>Loading ... </h2>}
      {messageList && (<div className='message-list__list'>
        {listMessage}
      </div>)}
      <Send handleChange={handleChange} sendMessage={sendMessage} />
    </div>
  )
}
