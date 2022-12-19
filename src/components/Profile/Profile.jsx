import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { byEnter } from '../../store/profileReducer';

export default function Profile() {
  const dispatch = useDispatch();
    return (
      <div className='absolute'>
        <div className="profile">
          <Link to={'/'}>
            <button className="close-profile">&times;
            </button>
          </Link>
          <div className='profile__checkbox'>
            <input type="checkbox" id="byEnter" name="onEnter" value="byEnter" onChange={(event) => {dispatch(byEnter(event.target.checked))}} defaultChecked/>
            <label htmlFor="byEnter">Send by Enter</label>
          </div>
        </div>
      </div>
    )
}
