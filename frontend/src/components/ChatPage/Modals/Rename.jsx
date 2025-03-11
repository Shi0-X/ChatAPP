// frontend/src/components/ChatPage/Modals/Rename.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'; // Importar toast
import { useTranslation } from 'react-i18next';
import { renameChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';

const Rename = () => {
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
      toast.error(t('modal.unique')); // "Must be unique"
      return;
    }
    try {
      await dispatch(renameChannel({ id: channelId, newName: newName.trim() })).unwrap();
      // Éxito => toast success
      toast.success(t('success.renameChannel')); // "Channel renamed"
      dispatch(closeModal());
    } catch (err) {
      // Error => toast error
      toast.error(t('errors.channelRename')); // "Error renaming channel"
      console.error(t('errors.channelRename'), err);
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{t('modal.renameChannel')}</h2>
        <p>{`${t('modal.toggle')}: ${currentChannel?.name}`}</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={t('modal.channelName')}
          />
          <button type="submit">{t('modal.rename')}</button>
          <button type="button" onClick={handleCancel}>{t('cancel')}</button>
        </form>
      </div>
    </div>
  );
};

export default Rename;
