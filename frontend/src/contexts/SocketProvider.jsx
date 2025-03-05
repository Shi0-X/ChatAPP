// frontend/src/contexts/SocketProvider.jsx
import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }) {
  // Detectar entorno: si es 'production', usar el dominio de Railway
  const isProduction = process.env.NODE_ENV === 'production';
  // Ajusta la URL a tu dominio real en Railway
  const productionUrl = 'https://chatapp-production-b85f.up.railway.app';

  const socketUrl = isProduction
    ? productionUrl
    : 'http://localhost:5001';

  // Crea la conexión solo una vez, dependiendo de socketUrl
  const socket = useMemo(() => io(socketUrl), [socketUrl]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
