import React from 'react';
import './style.css'

export default (props) => {
    return (
        <div className={`message ${props.message.type === 'sent' ? 'message__sent' : 'message__received'}`}>
            <h1 className='message__h1'> {props.message.author.name} </h1>
            <p className='message__p'> {props.message.text} </p>
            <p className='message__time'> {props.message.time} </p>
        </div>
    )
}