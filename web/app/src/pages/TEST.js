import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // ตรวจสอบ URL และพอร์ต

function TEST() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on('receive', (message) => {
            setChat((prevChat) => [...prevChat, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);
    const resivemessage =() => {
        
    }
    const sendMessage = () => {
        socket.emit('sendMessage', message);
        setMessage('');
    };

    return (
        <div className="App">
            <div>
                <h2>Chat</h2>
                {chat.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default TEST;
