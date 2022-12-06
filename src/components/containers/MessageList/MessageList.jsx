import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Message from '../../Message/Message';
import Send from '../../Send/Send';
import './style.css'

export function App() {
    const [messageList, setMessageList] = useState([]);

    const newMessage = (name, id, text, type) => {
        const mess = {
            author: {
                name: name,
                id: id
            },
            text: text || `I'm robot. Let me alone!`,
            id: messageList.length + 1,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString().substr(0, 5),
            type: type
        }
        return mess
    }

    const sendMessage = (event) => {
        const el = document.querySelector('#reply');
        event.preventDefault();
        const myMessage = newMessage('Anna Lukhanina', 1, el.value, 'sent');
        setMessageList([...messageList, myMessage], el.value = '')
    }

    useEffect(() => {
        if (messageList.length > 0 && messageList[messageList.length - 1].author.name === 'Anna Lukhanina') {
            const robotMessage = newMessage('Robot', 2, 0, 'received');
            const timer = setTimeout(() =>
                setMessageList([...messageList, robotMessage]), 1000);
        }
    }, [messageList])


    let listMessage = messageList.map(el => <Message message={el} key={el.id} />);

    return (
        <>
            <div className='message__list'>
                {listMessage}
            </div>
            <Send sendMessage={sendMessage} />
        </>
    )
}