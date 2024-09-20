import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000'); // Replace with your server URL

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessage('');
  };

  return (
    <div className="p-4">
      <div className="h-64 bg-gray-100 overflow-y-auto p-4 rounded shadow-md mb-4">
        {messages.map((msg, index) => (
          <p key={index} className="text-gray-700 mb-2">{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button 
        onClick={sendMessage}
        className="w-full bg-indigo-500 text-white p-2 rounded"
      >
        Send Message
      </button>
    </div>
  );
};

export default Chat;
