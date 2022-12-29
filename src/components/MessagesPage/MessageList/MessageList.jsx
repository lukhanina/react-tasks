import React, { useLayoutEffect, useRef } from 'react';
import Message from '../components/Message/Message';
import Send from '../components/Send/Send';
import './style.css';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loading, errMsg, addNewMsg } from '../../../store/msgReducer';

export const addMess = (chatId, name, id, text, mesType) => async (dispatch) => {
  dispatch(loading(true))
  dispatch(errMsg(null))
  try {
    const res = await fetch('/api/postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, name, id, text, mesType })
    });
    const msg = await res.json();
    dispatch(addNewMsg({ msg, chatId }));
  } catch (error) {
    dispatch(errMsg(error.message));
  } finally {
    dispatch(loading(false))
  }
}
export function MessageList() {
  const [chatId, messageList, status, error] = useOutletContext();
  const dispatch = useDispatch();
  const byEnter = useSelector((state) => state.profile.byEnter);
  const mesRef = useRef();

  const sendMessage = (event) => {
    event.preventDefault();
    const el = document.querySelector('#reply');
    el.value ? dispatch(addMess(+chatId, 'Anna Lukhanina', 2, el.value, 'sent')) : '';
    el.value = '';
  }

  const handleChange = (event) => {
    if (event.code === 'Enter' && event.shiftKey) {} 
    else if (event.code === 'Enter' && byEnter) {
      sendMessage(event)
    }
  }

  const listMessage = messageList?.map((el, idx) => {
    if (idx === messageList?.length - 1) {
      return (
        <Message mesRef={mesRef} message={el} key={idx + 1} />)
    }
    else return (
      <Message message={el} key={idx + 1} />)
  });

  useLayoutEffect(() => {
    const timer = setTimeout(() =>
      mesRef?.current?.scrollIntoView(), 100);
  }, [messageList]);

  return (
    <div className='message-list'>
      {status && <h2 className='absolute'>Loading ... </h2>}
      {messageList && !error && (<div className='message-list__list'>
        {listMessage}
      </div>)}
      <Send handleChange={handleChange} sendMessage={sendMessage} />
    </div>
  )
}
