// frontend/src/components/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login as loginRequest } from '../../chatApi/api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [authError, setAuthError] = useState(null);
  const { logIn } = useAuth(); // AuthProvider: guarda token y username
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setAuthError(null);
      // Llamamos a loginRequest (POST /login)
      const { token, username: returnedUser } = await loginRequest(values.username, values.password);
      // Guardamos token y username en AuthProvider
      logIn(token, returnedUser);
      // Redirigimos a "/"
      navigate('/');
    } catch (error) {
      setAuthError('Usuario o contraseña inválidos');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {authError && <div style={{ color: 'red' }}>{authError}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Usuario</label>
              <Field id="username" name="username" type="text" />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Ingresar'}
            </button>
          </Form>
        )}
      </Formik>

      {/* Enlace a /signup */}
      <p>
        ¿Nuevo en el chat?
        <Link to="/signup"> Registrarse</Link>
      </p>
    </div>
  );
}

export default LoginPage;
