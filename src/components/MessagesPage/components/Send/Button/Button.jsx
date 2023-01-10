import React from 'react';
import './style.css';
import SendIcon from '@mui/icons-material/Send';

export default ({sendMessage}) => {
  return (
    <button 
      className='input-group__i' 
      type='submit' 
      onClick={sendMessage}
      data-testid='send-btn'>
      <SendIcon />
    </button >)
}
