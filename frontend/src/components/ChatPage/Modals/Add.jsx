// frontend/src/components/ChatPage/Modals/Add.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';
import { useTranslation } from 'react-i18next';

function Add() {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState('');
  const inputRef = useRef(null);

  const { items: channels } = useSelector((state) => state.channels);
  const { isOpen, type } = useSelector((state) => state.modal);

  const { t } = useTranslation();

  useEffect(() => {
    if (type === 'addChannel' && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [type, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    const alreadyExists = channels.some((ch) => ch.name === channelName.trim());
    if (alreadyExists) {
      alert(t('modal.unique')); // "Must be unique"
      return;
    }
    try {
      await dispatch(addChannel({ name: channelName.trim() })).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error(t('errors.channelAdd'), err); // "Error adding channel"
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  if (type !== 'addChannel' || !isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* "Añadir Canal" => t('modal.add') => "Add channel" */}
        <h2>{t('modal.add')}</h2>
        <form onSubmit={handleSubmit}>
          {/* placeholder="Nombre del canal" => t('modal.channelName') => "Channel name" */}
          <input
            ref={inputRef}
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder={t('modal.channelName')}
          />
          {/* "Crear" => t('send') / "Create"? Podrías usar "send" o algo distinto */}
          <button type="submit">{t('send')}</button>
          {/* "Cancelar" => t('cancel') => "Cancel" */}
          <button type="button" onClick={handleCancel}>{t('cancel')}</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
