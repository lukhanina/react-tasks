import React, { useLayoutEffect, useRef } from 'react';
import Message from '../../Message/Message';
import Send from '../../Send/Send';
import './style.css';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMsgWithReply } from '../../../store/msgReducer';

export function MessageList() {
  const [chatId, messageList] = useOutletContext();
  const dispatch = useDispatch();
  const byEnter = useSelector((state) => state.profile.byEnter);
  const mesRef = useRef();

  const sendMessage = (event) => {
    event.preventDefault();
    const el = document.querySelector('#reply');
    el.value ? dispatch(addNewMsgWithReply(+chatId, 'Anna Lukhanina', 2, el.value, 'sent')) : '';
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
      <div className='message-list__list'>
        {listMessage}
      </div>
      <Send handleChange={handleChange} sendMessage={sendMessage} />
    </div>
  )
}
