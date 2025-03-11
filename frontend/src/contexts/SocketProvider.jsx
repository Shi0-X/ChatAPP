// frontend/src/contexts/SocketProvider.jsx
import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  // Detecta si el navegador está apuntando a localhost o no
  const isLocalhost = window.location.hostname === 'localhost';

  // Si es localhost, conecta a http://localhost:5001
  // Si es cualquier otro dominio, asume que estás en Railway
  const socketUrl = isLocalhost
    ? 'http://localhost:5001'
    : 'https://chatapp-production-b85f.up.railway.app';

  const socket = useMemo(() => io(socketUrl), [socketUrl]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
