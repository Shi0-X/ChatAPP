// frontend/src/components/ChatPage/Channels/ChannelsBox.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Channel from './Channel.jsx';

function ChannelsBox() {
  const channels = useSelector((state) => state.channels.items);

  return (
    <div>
      <h2>Canales</h2>
      <ul>
        {channels.map((ch) => <Channel key={ch.id} channel={ch} />)}
      </ul>
    </div>
  );
}

export default ChannelsBox;
