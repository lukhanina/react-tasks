import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Message from '../../Message/Message';
import Send from '../../Send/Send';
import './style.css';
import { useOutletContext } from 'react-router-dom';

export function MessageList(props) {
  const [chatId, messageList, send] = useOutletContext();
  const mesRef = useRef();

  const sendMessage = (event) => {
    event.preventDefault();
    const el = document.querySelector('#reply');
    el.value ? send(+chatId, messageList?.length + 1, 'Anna Lukhanina', 2, el.value, 'sent') : '';
    el.value = '';
  }   

  const handleChange = (event) => {
    if (event.code === 'Enter' && event.shiftKey) {} 
    else if (event.code === 'Enter') {
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
