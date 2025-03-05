// frontend/src/contexts/SocketProvider.jsx
import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }) {
  // Crea la conexión solo una vez
  const socket = useMemo(() => io('http://localhost:5001', {
    // Si tu backend requiere un token en la handshake,
    // podrías pasar auth: { token: localStorage.getItem('token') }
  }), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
