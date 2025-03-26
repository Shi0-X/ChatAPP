// frontend/src/components/ChatPage/Modals/Add.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { addChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';

const Add = () => {
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
      toast.error(t('modal.unique')); // "Must be unique"
      return;
    }
    try {
      await dispatch(addChannel({ name: channelName.trim() })).unwrap();
      toast.success(t('success.newChannel')); // "Channel created"
      dispatch(closeModal());
    } catch (err) {
      toast.error(t('errors.channelAdd')); // "Error adding channel"
      console.error(t('errors.channelAdd'), err);
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
        <h2>{t('modal.add')}</h2>
        <form onSubmit={handleSubmit}>
          {/* Label asociado al input por accesibilidad y para que el test lo reconozca */}
          <label className="visually-hidden" htmlFor="name">
            {t('modal.channelName')}
          </label>
          <input
            id="name"
            name="name"
            ref={inputRef}
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder={t('modal.channelName')}
          />
          <button type="submit">{t('send')}</button>
          <button type="button" onClick={handleCancel}>
            {t('cancel')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
