// src/contexts/AuthProvider.jsx
import React, { useState, useContext, createContext, useEffect } from 'react';

// Creamos el contexto
const AuthContext = createContext({});

// Custom hook para acceder al AuthContext más fácilmente
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // Al montar el AuthProvider, verificamos si hay un token en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Función para hacer login
  const logIn = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Función para hacer logout
  const logOut = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = Boolean(token);

  // Proveemos el valor a toda la aplicación
  const value = {
    token,
    isAuthenticated,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
