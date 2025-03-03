// src/components/ChatPage/ChatPage.jsx
import React, { useEffect, useState } from 'react';
import { getChannels, getMessages } from '../../api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir a /login
      navigate('/login');
      return;
    }
    // Caso contrario, cargar canales y mensajes
    getChannels().then(setChannels);
    getMessages().then(setMessages);
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Lista de Canales</h1>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>

      <h1>Lista de Mensajes</h1>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.body}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChatPage;
