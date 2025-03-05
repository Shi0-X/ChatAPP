// frontend/src/components/ChatPage/Messages/MessageForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../slices/thunks.js'; // Ajusta la ruta


function MessageForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit se ejecutó, text=', text);

    if (!text.trim()) {
      console.log('Texto vacío, no se emite nada');
      return;
    }

    console.log('Enviando mensaje con addMessage:', {
      body: text,
      channelId: 1,
      username: 'admin',
    });

    // Llamamos al thunk => POST /api/v1/messages
    dispatch(addMessage({ channelId: 1, body: text, username: 'admin' }));

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
