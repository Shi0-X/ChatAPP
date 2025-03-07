// src/components/App.jsx
import React from 'react';
import '../App.css';
import ChatNavbar from './Navbar/ChatNavbar.jsx'; // Nuevo

function App() {
  return (
    <div className="App">
      <ChatNavbar />
      <h1>Hexlet Chat (App container)</h1>
      <p>Aquí podrías colocar rutas u otros componentes.</p>
    </div>
  );
}

export default App;
