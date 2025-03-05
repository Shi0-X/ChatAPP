// frontend/src/components/ChatPage/ChatPage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchInitialData } from '../../slices/thunks.js';
import { useSocket } from '../../contexts/SocketProvider.jsx';
import { messageReceived } from '../../slices/messagesSlice.js';
import ChannelsBox from './Channels/ChannelsBox.jsx';
import MessagesBox from './Messages/MessagesBox.jsx';
import MessageForm from './Messages/MessageForm.jsx';

function ChatPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  // Al montar, si está autenticado, cargamos canales y mensajes
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchInitialData());
  }, [isAuthenticated, navigate, dispatch]);

  // Suscribirse al evento 'newMessage' emitido por el servidor
  // cuando alguien hace POST /api/v1/messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (payload) => {
      console.log('Recibido evento newMessage desde el servidor:', payload);
      // payload = { id, body, channelId, username, ... }
      dispatch(messageReceived(payload));
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
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
    </div>
  );
}

export default ChatPage;
