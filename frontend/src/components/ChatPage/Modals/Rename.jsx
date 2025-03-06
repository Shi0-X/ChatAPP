// frontend/src/components/ChatPage/Modals/Rename.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renameChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';

function Rename() {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  const inputRef = useRef(null);

  const { items: channels } = useSelector((state) => state.channels);
  const { isOpen, type, channelId } = useSelector((state) => state.modal);

  useEffect(() => {
    if (type === 'renameChannel' && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [type, isOpen]);

  if (type !== 'renameChannel' || !isOpen) {
    return null;
  }

  // Canal actual (para mostrar su nombre o validaciones)
  const currentChannel = channels.find((ch) => ch.id === channelId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    // Validar que no se repita
    const alreadyExists = channels.some((ch) => ch.name === newName.trim());
    if (alreadyExists) {
      alert('Ese nombre de canal ya existe.');
      return;
    }
    try {
      await dispatch(renameChannel({ id: channelId, newName: newName.trim() })).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error('Error al renombrar canal:', err);
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Renombrar canal</h2>
        <p>Canal actual: {currentChannel?.name}</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nuevo nombre"
          />
          <button type="submit">Renombrar</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default Rename;
