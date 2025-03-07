// frontend/src/components/SignupPage/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../chatApi/api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';

function SignupPage() {
  const navigate = useNavigate();
  const { logIn } = useAuth(); // si tu AuthProvider maneja logIn(token, username)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones front
    if (username.length < 3 || username.length > 20) {
      setError('El nombre de usuario debe tener entre 3 y 20 caracteres');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Llamamos a signup (POST /api/v1/signup)
      const { token, username: returnedUser } = await signup(username, password);
      // Llamamos a logIn(token, returnedUser) para guardar ambos en AuthProvider
      logIn(token, returnedUser);
      // Redirigimos al chat
      navigate('/');
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Ese usuario ya existe');
      } else {
        setError('Error al registrarse');
      }
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>Confirmar contraseña
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default SignupPage;
