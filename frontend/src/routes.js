// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './components/App.jsx';
import ChatPage from './components/ChatPage/ChatPage.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import NotFoundPage from './components/Errors/NotFoundPage.jsx';

const apiPath = 'api/v1';

export const appPaths = {
  signUp: '/signup',
  login: '/login',
  chat: '/',
  notFound: '*',
};

export const apiRoutes = {
  signup: () => [apiPath, 'signup'].join('/'),
  login: () => [apiPath, 'login'].join('/'),
  channels: () => [apiPath, 'channels'].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
};

// Componente principal de enrutamiento
function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal (/) -> ChatPage */}
        <Route path={appPaths.chat} element={<ChatPage />} />

        {/* Ruta /login -> LoginPage */}
        <Route path={appPaths.login} element={<LoginPage />} />

        {/* O si quisieras que la ruta / muestre App.jsx, haz:
          <Route path="/" element={<App />} /> 
          <Route path="/chat" element={<ChatPage />} /> 
        */}

        {/* Ruta 404 -> NotFoundPage */}
        <Route path={appPaths.notFound} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
