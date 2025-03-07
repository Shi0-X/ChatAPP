// frontend/src/components/ChatPage/Messages/MessageForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../contexts/AuthProvider.jsx';
import { addMessage } from '../../../slices/thunks.js';
import { useTranslation } from 'react-i18next';

function MessageForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { username } = useAuth();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      console.log(t('messageBody')); // "Message cannot be empty"
      return;
    }

    const payload = {
      body: text,
      channelId: currentChannelId,
      username: username || 'anon',
    };

    dispatch(addMessage(payload));
    setText('');
  };

  return (
    <div>
      {/* "Nuevo Mensaje" => t('newMessage') => "New message" */}
      <h3>{t('newMessage')}</h3>
      <form onSubmit={handleSubmit}>
        {/* placeholder="Escribe tu mensaje..." => t('placeholders.newMessage') => "Enter a message..." */}
        <input
          type="text"
          placeholder={t('placeholders.newMessage')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* "Enviar" => t('send') => "Send" */}
        <button type="submit">{t('send')}</button>
      </form>
    </div>
  );
}

export default MessageForm;
