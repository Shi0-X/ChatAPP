// frontend/src/components/ChatPage/Messages/MessageForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../../slices/thunks.js';
import { useAuth } from '../../../contexts/AuthProvider.jsx';

function MessageForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  // Leemos el username real desde AuthProvider
  const { username } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const payload = {
      body: text,
      channelId: currentChannelId,
      username: username || 'anon', // fallback si no hay username
    };

    dispatch(addMessage(payload));
    setText('');
  };

  return (
    <div>
      <h3>Nuevo Mensaje</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default MessageForm;
