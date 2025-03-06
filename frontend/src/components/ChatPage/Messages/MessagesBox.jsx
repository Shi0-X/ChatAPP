// frontend/src/components/ChatPage/Messages/MessagesBox.jsx
import React from 'react';
import { useSelector } from 'react-redux';

function MessagesBox() {
  const messages = useSelector((state) => state.messages.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  // Filtrar solo los mensajes del canal actual
  const filteredMessages = messages.filter(
    (msg) => msg.channelId === currentChannelId
  );

  return (
    <div>
      <h2>Mensajes</h2>
      <ul>
        {filteredMessages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.username || 'anon'}:</strong> {msg.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessagesBox;
