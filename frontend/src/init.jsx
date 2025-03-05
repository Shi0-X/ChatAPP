// frontend/src/init.jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import AuthProvider from './contexts/AuthProvider.jsx';
import SocketProvider from './contexts/SocketProvider.jsx';
import AppRoutes from './routes.js';

export default async function init() {
  // Si necesitas lógica asíncrona, hazla aquí (por ejemplo, i18n.load).
  // Devuelve el VDOM final:
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <SocketProvider>
            <AppRoutes />
          </SocketProvider>
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  );
}
