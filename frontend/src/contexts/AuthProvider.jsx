// src/contexts/AuthProvider.jsx
import React, { useState, useContext, createContext, useEffect } from 'react';

// Creamos el contexto
const AuthContext = createContext({});

// Custom hook para acceder al AuthContext más fácilmente
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // Al montar, verificamos si hay token en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Función para hacer login (recibe newToken desde el login real)
  const logIn = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Función para hacer logout
  const logOut = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Por si acaso
  };

  const isAuthenticated = Boolean(token);

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
