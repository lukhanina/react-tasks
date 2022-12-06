import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
library.add(faPaperPlane);

export default (props) => {
    return (
        <button className='input-group__i' type='submit' onClick={props.sendMessage}>
            <FontAwesomeIcon icon='fa-paper-plane' />
        </button >)
}