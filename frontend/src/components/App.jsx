// frontend/src/components/App.jsx
import React from 'react';
import '../App.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from '../routes.js';
import ChatNavbar from './Navbar/ChatNavbar.jsx';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <ChatNavbar />
      <ToastContainer />
      <AppRoutes />
    </BrowserRouter>
  </div>
);

export default App;
