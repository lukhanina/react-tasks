import React from 'react';
import './style.css';
import Textarea from './Textarea/Textarea';
import Button from './Button/Button';

export default ({handleChange, sendMessage}) => {
  return (
    <form className='input-group'>
      <Textarea handleChange={handleChange} />
      <Button sendMessage={sendMessage} />
    </form>
  )
}
