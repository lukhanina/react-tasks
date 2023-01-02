import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { addChat } from '../../../store/msgReducer';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../../services/firebase';
import { ref, update } from 'firebase/database';

export default function AddChat() {
  const [chatName, setChatName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { chats } = useSelector((state) => state.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newChat = {
        contactName: chatName,
        avatar: '',
        messages: ['']
      };
      const newChatKey = Object.keys(chats).length + 1;
      const updates = {};
      updates['/chats/' + newChatKey] = newChat;
      update(ref(db), updates);
      dispatch(addChat({newPostKey: newChat}));
      navigate('/chats/')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='absolute'>
      <div className="add-chat">
        <Link to={'/'}>
          <button className="close-profile">&times;
          </button>
        </Link>
        {loading && <h2>Loading... </h2>}
        {!error && !loading && <div className='profile__checkbox'>
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
