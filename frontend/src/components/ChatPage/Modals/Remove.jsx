// frontend/src/components/ChatPage/Modals/Remove.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';

function Remove() {
  const dispatch = useDispatch();
  const { isOpen, type, channelId } = useSelector((state) => state.modal);

  if (type !== 'removeChannel' || !isOpen) {
    return null;
  }

  const handleConfirm = async () => {
    try {
      await dispatch(removeChannel({ id: channelId })).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error('Error al eliminar canal:', err);
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>¿Eliminar canal?</h2>
        <p>Esta acción no se puede deshacer.</p>
        <button type="button" onClick={handleConfirm}>Confirmar</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default Remove;
