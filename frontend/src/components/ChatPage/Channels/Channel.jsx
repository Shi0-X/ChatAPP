// frontend/src/components/ChatPage/Channels/Channel.jsx
import React from 'react';

function Channel({ channel }) {
  return (
    <li>
      {channel.name}
    </li>
  );
}

export default Channel;