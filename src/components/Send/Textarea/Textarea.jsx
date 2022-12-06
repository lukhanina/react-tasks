import React from 'react';
import './style.css';

export default () => {
    return (
        <div className='label-in-textarea'>
            <textarea id='reply' className='form-control' rows='2' required name='text'></textarea>
            <label htmlFor='reply' className='form__label'>Write a message...</label>
        </div>
    )
}