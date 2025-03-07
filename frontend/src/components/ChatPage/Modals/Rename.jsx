// frontend/src/components/ChatPage/Modals/Rename.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renameChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';
import { useTranslation } from 'react-i18next';

function Rename() {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  const inputRef = useRef(null);

  const { items: channels } = useSelector((state) => state.channels);
  const { isOpen, type, channelId } = useSelector((state) => state.modal);

  const { t } = useTranslation();

  useEffect(() => {
    if (type === 'renameChannel' && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [type, isOpen]);

  if (type !== 'renameChannel' || !isOpen) {
    return null;
  }

  const currentChannel = channels.find((ch) => ch.id === channelId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const alreadyExists = channels.some((ch) => ch.name === newName.trim());
    if (alreadyExists) {
      alert(t('modal.unique')); // "Must be unique"
      return;
    }
    try {
      await dispatch(renameChannel({ id: channelId, newName: newName.trim() })).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error(t('errors.channelRename'), err); // "Error renaming channel"
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* "Renombrar canal" => t('modal.renameChannel') => "Rename channel" */}
        <h2>{t('modal.renameChannel')}</h2>
        {/* "Canal actual" => Podrías usar algo como t('modal.toggle') */}
        <p>{`${t('modal.toggle')}: ${currentChannel?.name}`}</p>
        <form onSubmit={handleSubmit}>
          {/* placeholder="Nuevo nombre" => t('modal.channelName') */}
          <input
            ref={inputRef}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t('modal.channelName')}
          />
          {/* "Renombrar" => t('modal.rename') => "Rename" */}
          <button type="submit">{t('modal.rename')}</button>
          {/* "Cancelar" => t('cancel') => "Cancel" */}
          <button type="button" onClick={handleCancel}>{t('cancel')}</button>
        </form>
      </div>
    </div>
  );
}

export default Rename;
