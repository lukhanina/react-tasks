import React from 'react';
import './style.css';
import SendIcon from '@mui/icons-material/Send';

export default (props) => {
    return (
        <button className='input-group__i' type='submit' onClick={props.sendMessage}>
            <SendIcon />
        </button >)
}