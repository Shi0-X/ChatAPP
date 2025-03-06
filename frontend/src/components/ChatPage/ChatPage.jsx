// frontend/src/components/ChatPage/ChatPage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchInitialData } from '../../slices/thunks.js';
import { useSocket } from '../../contexts/SocketProvider.jsx';
import { messageReceived } from '../../slices/messagesSlice.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../../slices/thunks.js';
import ChannelsBox from './Channels/ChannelsBox.jsx';
import MessagesBox from './Messages/MessagesBox.jsx';
import MessageForm from './Messages/MessageForm.jsx';

// Modales
import Add from './Modals/Add.jsx';
import Remove from './Modals/Remove.jsx';
import Rename from './Modals/Rename.jsx';

function ChatPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchInitialData());
  }, [isAuthenticated, navigate, dispatch]);

  // Suscribirse a los eventos de sockets
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (payload) => {
      console.log('Recibido evento newMessage:', payload);
      dispatch(messageReceived(payload));
    };

    // Opcional: si el backend emite 'newChannel', 'removeChannel', 'renameChannel'
    // y deseas actualizarlos en tiempo real sin esperar la respuesta HTTP:
    const handleNewChannel = (payload) => {
      console.log('Recibido evento newChannel:', payload);
      // Podrías despachar addChannel.fulfilled manualmente, etc.
      // O volver a fetch channels. Depende de tu lógica.
    };
    const handleRemoveChannel = (payload) => {
      console.log('Recibido evento removeChannel:', payload);
      // idem, despachar removeChannel.fulfilled manual o refrescar.
    };
    const handleRenameChannel = (payload) => {
      console.log('Recibido evento renameChannel:', payload);
      // idem
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
    };
  }, [socket, dispatch]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{
        width: '250px',
        borderRight: '1px solid #ccc',
        padding: '1rem',
        overflowY: 'auto',
      }}
      >
        <ChannelsBox />
      </div>
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        <MessagesBox />
        <MessageForm />
      </div>

      {/* Modales */}
      <Add />
      <Remove />
      <Rename />
    </div>
  );
}

export default ChatPage;
