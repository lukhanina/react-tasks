import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Message from '../../Message/Message';
import Send from '../../Send/Send';
import './style.css';

export function MessageList() {
    const [messageList, setMessageList] = useState([]);

    const newMessage = (name, id, text, type) => {
        const mess = {
            author: {
                name: name || 'Bot',
                id: id || 1
            },
            text: text || `I'm robot. Let me alone!`,
            id: messageList.length + 1,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString().substr(0, 5),
            type: type || 'received'
        }
        return mess
    }

    const sendMessage = (event) => {
        const el = document.querySelector('#reply');
        event.preventDefault();
        const myMessage = newMessage('Anna Lukhanina', 2, el.value, 'sent');
        el.value ? setMessageList([...messageList, myMessage], el.value = '') : '';
    }

    const handleChange = (event) => {
        if (event.code === 'Enter' && event.shiftKey) {
        } else if (event.code === 'Enter') {
            sendMessage(event)
        }
    }

    useEffect(() => {
        if (messageList.length > 0 && messageList[messageList.length - 1].author.name !== 'Bot') {
            const robotMessage = newMessage();
            const timer = setTimeout(() =>
                setMessageList([...messageList, robotMessage]), 1000);
        }
    }, [messageList])


    let listMessage = messageList.map(el => <Message message={el} key={el.id} />);

    return (
        <div className='message-list'>
            <div className='message-list__list'>
                {listMessage}
            </div>
            <Send handleChange={handleChange} sendMessage={sendMessage} />
        </div>
    )
}