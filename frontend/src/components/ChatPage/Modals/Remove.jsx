// frontend/src/components/ChatPage/Modals/Remove.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'; // Importar toast
import { useTranslation } from 'react-i18next';
import { removeChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';

const Remove = () => {
  const dispatch = useDispatch();
  const { isOpen, type, channelId } = useSelector((state) => state.modal);
  const { t } = useTranslation();

  if (type !== 'removeChannel' || !isOpen) {
    return null;
  }

  const handleConfirm = async () => {
    try {
      await dispatch(removeChannel({ id: channelId })).unwrap();
      // Éxito => toast success
      toast.success(t('success.removeChannel')); // "Channel removed"
      dispatch(closeModal());
    } catch (err) {
      // Error => toast error
      toast.error(t('errors.channelRemove')); // "Error removing channel"
      console.error(t('errors.channelRemove'), err);
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{t('modal.removeChannel')}</h2>
        <p>{t('modal.confirm')}</p>
        <button
          type="button"
          className="btn-danger"
          onClick={handleConfirm}
        >
          {t('send')}
        </button>
        <button type="button" onClick={handleCancel}>
          {t('cancel')}
        </button>
      </div>
    </div>
  );
};

export default Remove;
