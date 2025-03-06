// frontend/src/components/ChatPage/Modals/Add.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';

function Add() {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState('');
  const inputRef = useRef(null);

  const { items: channels } = useSelector((state) => state.channels);
  const { isOpen, type } = useSelector((state) => state.modal);

  // Enfocar el input al abrir el modal
  useEffect(() => {
    if (type === 'addChannel' && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [type, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName.trim()) return;
    // Validar que no se repita el nombre
    const alreadyExists = channels.some((ch) => ch.name === channelName.trim());
    if (alreadyExists) {
      alert('Ese nombre de canal ya existe.');
      return;
    }
    try {
      await dispatch(addChannel({ name: channelName.trim() })).unwrap();
      dispatch(closeModal());
    } catch (err) {
      console.error('Error al crear canal:', err);
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  if (type !== 'addChannel' || !isOpen) {
    return null; // No renderiza si no es el modal actual
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Añadir Canal</h2>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Nombre del canal"
          />
          <button type="submit">Crear</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
