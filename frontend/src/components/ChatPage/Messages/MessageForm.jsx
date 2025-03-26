// frontend/src/components/ChatPage/Messages/MessageForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity'; // (Ya importado para limpiar texto)
import { useAuth } from '../../../contexts/AuthProvider.jsx';
import { addMessage } from '../../../slices/thunks.js';

const MessageForm = () => {
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

    // Limpieza de blasfemias antes de enviar
    const cleanedText = leoProfanity.clean(text);

    const payload = {
      body: cleanedText,
      channelId: currentChannelId,
      username: username || 'anon',
    };

    dispatch(addMessage(payload));
    setText('');
  };

  return (
    <div>
      <h3>{t('newMessage')}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('placeholders.newMessage')}
          aria-label={t('newMessage')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">{t('send')}</button>
      </form>
    </div>
  );
};

export default MessageForm;
