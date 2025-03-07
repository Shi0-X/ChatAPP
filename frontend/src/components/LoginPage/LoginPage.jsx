// frontend/src/components/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { login as loginRequest } from '../../chatApi/api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';

function LoginPage() {
  const { t } = useTranslation(); // Importamos useTranslation de react-i18next
  const [authError, setAuthError] = useState(null);
  const { logIn } = useAuth();
  const navigate = useNavigate();

  // Usamos las claves de tu archivo en.js para los mensajes de validación
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setAuthError(null);
      const { token, username: returnedUser } = await loginRequest(values.username, values.password);
      logIn(token, returnedUser);
      navigate('/');
    } catch (error) {
      // Si falla, mostramos el error de credenciales inválidas (invalidFeedback)
      setAuthError(t('invalidFeedback'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Título de la página: 'entry' => "Log in" */}
      <h2>{t('entry')}</h2>

      {/* Error de autenticación si las credenciales son inválidas */}
      {authError && <div style={{ color: 'red' }}>{authError}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              {/* Label para username -> 'placeholders.username' => "Username" */}
              <label htmlFor="username">{t('placeholders.username')}</label>
              <Field id="username" name="username" type="text" />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              {/* Label para password -> 'placeholders.password' => "Password" */}
              <label htmlFor="password">{t('placeholders.password')}</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {/* Si está enviando, muestra 'loading', de lo contrario 'entry' => "Log in" */}
              {isSubmitting ? t('loading') : t('entry')}
            </button>
          </Form>
        )}
      </Formik>

      <p>
        {/* "¿Nuevo en el chat?" -> 'noAccount' => "No account?" */}
        {t('noAccount')}
        {/* "Registrarse" -> 'makeRegistration' => "Sign up" */}
        <Link to="/signup"> {t('makeRegistration')}</Link>
      </p>
    </div>
  );
}

export default LoginPage;
