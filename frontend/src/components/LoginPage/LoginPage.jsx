// frontend/src/components/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { login as loginRequest } from '../../chatApi/api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  const [authError, setAuthError] = useState(null);
  const { logIn } = useAuth();
  const navigate = useNavigate();

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
      const {
        token,
        username: returnedUser,
      } = await loginRequest(values.username, values.password);

      logIn(token, returnedUser);
      navigate('/');
    } catch (error) {
      setAuthError(t('errors.invalidFeedback'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>{t('entry')}</h2>

      {authError && <div style={{ color: 'red' }}>{authError}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              {/* 👇 Aseguramos que el texto sea visible para Playwright */}
              <label htmlFor="username">{t('placeholders.login')}</label>
              <Field id="username" name="username" type="text" />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="password">{t('placeholders.password')}</label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t('loading') : t('entry')}
            </button>
          </Form>
        )}
      </Formik>

      <p>
        {t('noAccount')}
        {' '}
        <Link to="/signup">
          {t('makeRegistration')}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
