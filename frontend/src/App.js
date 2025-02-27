import React, { useEffect, useState } from 'react';
import { getChannels, getMessages } from './api';

function App() {
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getChannels().then(setChannels);
    getMessages().then(setMessages);
  }, []);

  return (
    <div>
      <h1>Lista de Canales</h1>
      <ul>
        {channels.map(channel => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>

      <h1>Lista de Mensajes</h1>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>{msg.body}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
