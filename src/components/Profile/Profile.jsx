import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  render() {
      return (
        <div className='absolute'>
          <div className="profile">
            <Link to={'/'}>
              <button className="close-profile">&times;
              </button>
            </Link>
          </div>
        </div>
      )
    }
  }
