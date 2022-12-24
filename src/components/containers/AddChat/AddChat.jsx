import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { addChat } from '../../../store/msgReducer';
import { useDispatch } from 'react-redux';


export default function AddChat() {
  const [chatName, setChatName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    return fetch('/api/addChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({chatName})
    })
      .then((response) => {
        if (!response.ok) {
          alert(`Network response was not OK, error ${response.status}`)
        }
        return response.json()})
      .then((chat) => {
        dispatch(addChat(chat))
      })
      .then(navigate('/chats/'))
  }

  return (
    <div className='absolute'>
      <div className="add-chat">
        <Link to={'/'}>
          <button className="close-profile">&times;
          </button>
        </Link>
        <div className='profile__checkbox'>
          <form onSubmit={add}>
            <label htmlFor="cname">Contact name:</label><br/>
            <input type="text" id="cname" name="cname" className='add-chat__input' onChange={(e) => setChatName(e.target.value)} autoFocus/><br/>
            <input type="submit" value="Submit" />
          </form> 
        </div>
      </div>
    </div>
  )
}
