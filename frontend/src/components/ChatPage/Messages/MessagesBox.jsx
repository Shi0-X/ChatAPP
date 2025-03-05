// frontend/src/components/ChatPage/Messages/MessagesBox.jsx
import React from 'react';
import { useSelector } from 'react-redux';

function MessagesBox() {
  const messages = useSelector((state) => state.messages.items);

  return (
    <div>
      <h2>Mensajes</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.username || 'anon'}:</strong> {msg.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessagesBox;
