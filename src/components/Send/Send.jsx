import React from 'react';
import './style.css';
import Textarea from './Textarea/Textarea';
import Button from './Button/Button';

export default (props) => {
    return (
        <form className='input-group'>
            <Textarea handleChange={props.handleChange} />
            <Button sendMessage={props.sendMessage} />
        </form>
    )
}