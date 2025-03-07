// frontend/src/components/ChatPage/Modals/Remove.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';
import { useTranslation } from 'react-i18next';

function Remove() {
  const dispatch = useDispatch();
  const { isOpen, type, channelId } = useSelector((state) => state.modal);
  const { t } = useTranslation();

  if (type !== 'removeChannel' || !isOpen) {
    return null;
  }

  const handleConfirm = async () => {
    try {
      await dispatch(removeChannel({ id: channelId })).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error(t('errors.channelRemove'), err); // "Error removing channel"
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* "¿Eliminar canal?" => t('modal.removeChannel') => "Remove channel" */}
        <h2>{t('modal.removeChannel')}</h2>
        {/* "Esta acción no se puede deshacer." => t('modal.confirm') => "Are you sure?" */}
        <p>{t('modal.confirm')}</p>
        {/* "Confirmar" => t('send') o "Yes"? */}
        <button type="button" onClick={handleConfirm}>{t('send')}</button>
        {/* "Cancelar" => t('cancel') */}
        <button type="button" onClick={handleCancel}>{t('cancel')}</button>
      </div>
    </div>
  );
}

export default Remove;
