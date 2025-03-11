// frontend/src/components/App.jsx
import React from 'react';
import '../App.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from '../routes.js';

import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="App">
    {/* Envolvemos las rutas con BrowserRouter */}
    <BrowserRouter>
      {/* Quitamos ChatNavbar para que no aparezca en login/signup */}
      <ToastContainer />

      {/* Tus rutas definidas en routes.js */}
      <AppRoutes />
    </BrowserRouter>
  </div>
);

export default App;
