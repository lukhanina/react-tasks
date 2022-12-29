import React from 'react';
import './style.css'

export default ({message, mesRef}) => {
  return (
    <div className={`message ${message?.type === 'sent' ? 'message__sent' : 'message__received'}`} ref={mesRef}>
      <h1 className='message__h1'> {message?.author?.name} </h1>
      <p className='message__p'> {message?.text} </p>
      <p className='message__time'> {message?.date} </p>
      <p className='message__time'> {message?.time} </p>
    </div >
  )
}
