// frontend/src/components/SignupPage/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { signup } from '../../chatApi/api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';

function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones en frontend
    if (username.length < 3 || username.length > 20) {
      setError(t('regRules.name')); // "From 3 to 20 characters"
      return;
    }
    if (password.length < 6) {
      setError(t('regRules.password')); // "At least 6 characters"
      return;
    }
    if (password !== confirm) {
      setError(t('regRules.passwordEquality')); // "Passwords must match"
      return;
    }

    try {
      const { token, username: returnedUser } = await signup(username, password);
      logIn(token, returnedUser);
      navigate('/');
    } catch (err) {
      if (err.response?.status === 409) {
        setError(t('errors.userExist')); // "This user already exists"
      } else {
        setError(t('error')); // "Error" or "Error during registration"
      }
    }
  };

  return (
    <div>
      {/* Título en español => t('registration') => "Registration" */}
      <h2>{t('registration')}</h2>

      {/* Mensaje de error */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          {/* "Nombre de usuario" => t('placeholders.username') => "Username" */}
          <label>
            {t('placeholders.username')}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          {/* "Contraseña" => t('placeholders.password') => "Password" */}
          <label>
            {t('placeholders.password')}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          {/* "Confirmar contraseña" => t('placeholders.confirmPassword') => "Confirm password" */}
          <label>
            {t('placeholders.confirmPassword')}
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
        </div>
        {/* "Registrarse" => t('makeRegistration') => "Sign up" */}
        <button type="submit">{t('makeRegistration')}</button>
      </form>

      <p>
        {/* "¿Ya tienes cuenta?" => Podríamos usar "Already have an account?" */}
        {t('alreadyHaveAccount')}{' '}
        {/* "Inicia sesión" => "entry" (o "Log in") */}
        <Link to="/login">{t('entry')}</Link>
      </p>
    </div>
  );
}

export default SignupPage;
