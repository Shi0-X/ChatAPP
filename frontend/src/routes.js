// frontend/src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ChatPage from './components/ChatPage/ChatPage.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import SignupPage from './components/SignupPage/SignupPage.jsx';
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

// Componente principal de rutas
const AppRoutes = () => (
  <Routes>
    <Route path={appPaths.chat} element={<ChatPage />} />
    <Route path={appPaths.login} element={<LoginPage />} />
    <Route path={appPaths.signUp} element={<SignupPage />} />
    <Route path={appPaths.notFound} element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
