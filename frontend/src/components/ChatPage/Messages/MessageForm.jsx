// frontend/src/components/ChatPage/Messages/MessageForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../../slices/thunks.js';

function MessageForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  // Leemos el username desde localStorage
  const username = localStorage.getItem('username') || 'anon';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit se ejecutó, text=', text);

    if (!text.trim()) {
      console.log('Texto vacío, no se emite nada');
      return;
    }

    const payload = {
      body: text,
      channelId: currentChannelId,
      username, // leer la clave real
    };

    console.log('Enviando mensaje con addMessage:', payload);
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
