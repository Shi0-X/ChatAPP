// frontend/src/components/ChatPage/Messages/Message.jsx
import React from 'react';

const Message = ({ message }) => (
  <li>
    <strong>
      {message.username || 'anon'}
      :
    </strong>
    {' '}
    {message.body}
  </li>
);

export default Message;
