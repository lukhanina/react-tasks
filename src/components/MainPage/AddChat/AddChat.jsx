import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { addChat, loading, errMsg } from '../../../store/msgReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function AddChat() {
  const [chatName, setChatName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.msg);

  const add = async (e) => {
    e.preventDefault();
    dispatch(loading(true))
    try {
      const res = await fetch('/api/addChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({chatName})
      })
      const data = await res.json()
      dispatch(addChat(data))
      navigate('/chats/')
    } catch (error) {
      dispatch(errMsg(error.message))
    } finally {
      dispatch(loading(false))
    }
  }

  return (
    <div className='absolute'>
      <div className="add-chat">
        <Link to={'/'}>
          <button className="close-profile">&times;
          </button>
        </Link>
        {!error && <div className='profile__checkbox'>
          <form onSubmit={add}>
            <label htmlFor="cname">Contact name:</label><br/>
            <input type="text" id="cname" name="cname" className='add-chat__input' onChange={(e) => setChatName(e.target.value)} autoFocus/><br/>
            <input type="submit" value="Submit" />
          </form> 
        </div>}
        {error && (<div>
          <h2 style={{color: 'red'}}>Sorry, error occured {error} </h2>
          <button onClick={add}>Readd chat</button>
        </div>)}
      </div>
    </div>
  )
}
