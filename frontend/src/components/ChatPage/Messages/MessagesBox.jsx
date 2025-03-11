// frontend/src/components/ChatPage/Messages/MessagesBox.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MessagesBox = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  // Filtrar solo los mensajes del canal actual
  const filteredMessages = messages.filter(
    (msg) => msg.channelId === currentChannelId,
  );

  return (
    <div>
      {/* "Mensajes" => t('messagesTitle') => "Messages" */}
      <h2>{t('messagesTitle')}</h2>
      <ul>
        {filteredMessages.map((msg) => (
          <li key={msg.id}>
            <strong>
              {msg.username || 'anon'}
              :
            </strong>
            {' '}
            {msg.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesBox;
