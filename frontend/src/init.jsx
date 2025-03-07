// frontend/src/init.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import store from './slices/index.js';
import AuthProvider from './contexts/AuthProvider.jsx';
import SocketProvider from './contexts/SocketProvider.jsx';
import AppRoutes from './routes.js';
import resources from './locales/index.js'; // Importamos el objeto { en } desde locales/index.js

export default async function init() {
  // Inicializamos i18n
  i18n
    .use(initReactI18next)
    .init({
      lng: 'en',         // Idioma por defecto
      fallbackLng: 'en', // Si no encuentra traducciones en 'en', vuelve a 'en'
      debug: false,      // ponlo en true si deseas ver logs de i18n en consola
      resources,         // { en: {...} }
    });

  // Retornamos el VDOM final envuelto en I18nextProvider
  return (
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <SocketProvider>
              <AppRoutes />
            </SocketProvider>
          </AuthProvider>
        </I18nextProvider>
      </Provider>
    </React.StrictMode>
  );
}

