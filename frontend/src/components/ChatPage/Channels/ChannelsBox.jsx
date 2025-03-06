// frontend/src/components/ChatPage/Channels/ChannelsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../../slices/modalSlice.js';
import { setCurrentChannelId } from '../../../slices/channelsSlice.js';
import Channel from './Channel.jsx';

function ChannelsBox() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const handleSelectChannel = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  const handleRemoveChannel = (id) => {
    dispatch(openModal({ type: 'removeChannel', channelId: id }));
  };

  const handleRenameChannel = (id) => {
    dispatch(openModal({ type: 'renameChannel', channelId: id }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Canales</h2>
        <button type="button" onClick={handleAddChannel}>+</button>
      </div>
      <ul>
        {channels.map((ch) => (
          <li key={ch.id} style={{ margin: '5px 0' }}>
            <button
              type="button"
              onClick={() => handleSelectChannel(ch.id)}
              style={{ fontWeight: ch.id === currentChannelId ? 'bold' : 'normal' }}
            >
              # {ch.name}
            </button>

            {/* Menú de opciones si es removable */}
            {ch.removable && (
              <span style={{ marginLeft: '10px' }}>
                <button type="button" onClick={() => handleRemoveChannel(ch.id)}>Remove</button>
                <button type="button" onClick={() => handleRenameChannel(ch.id)}>Rename</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChannelsBox;
