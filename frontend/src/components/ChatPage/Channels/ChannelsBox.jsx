// frontend/src/components/ChatPage/Channels/ChannelsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../../slices/modalSlice.js';
import { setCurrentChannelId } from '../../../slices/channelsSlice.js';
import Channel from './Channel.jsx';
import { useTranslation } from 'react-i18next';

function ChannelsBox() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const { t } = useTranslation();

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
        {/* "Canales" => t('channelsTitle') => "Channels" */}
        <h2>{t('channelsTitle')}</h2>
        {/* Botón + => Podrías usar t('modal.add') => "Add channel" o dejar + */}
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
                {/* "Remove" => t('modal.remove') => "Remove" */}
                <button type="button" onClick={() => handleRemoveChannel(ch.id)}>
                  {t('modal.remove')}
                </button>
                {/* "Rename" => t('modal.rename') => "Rename" */}
                <button type="button" onClick={() => handleRenameChannel(ch.id)}>
                  {t('modal.rename')}
                </button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChannelsBox;
