// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes.js';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './contexts/AuthProvider.jsx'; // <--- Importa tu AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
