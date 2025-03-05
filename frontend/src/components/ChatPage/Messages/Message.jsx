// frontend/src/components/ChatPage/Messages/Message.jsx
import React from 'react';

function Message({ message }) {
  return (
    <li>
      <strong>{message.username || 'anon'}:</strong> {message.body}
    </li>
  );
}

export default Message;
