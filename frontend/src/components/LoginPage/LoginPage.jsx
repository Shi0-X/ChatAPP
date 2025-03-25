import React, { useState, useRef, useEffect } from 'react';
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
  const [authFailed, setAuthFailed] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

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
      setAuthFailed(false);
      const {
        token,
        username: returnedUser,
      } = await loginRequest(values.username, values.password);

      logIn(token, returnedUser);
      navigate('/');
    } catch (error) {
      setAuthFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>{t('entry')}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">{t('placeholders.login')}</label>
              <Field
                id="username"
                name="username"
                type="text"
                innerRef={usernameRef}
              />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="password">{t('placeholders.password')}</label>
              <Field
                id="password"
                name="password"
                type="password"
              />
              <ErrorMessage name="password" component="div" />
            </div>

            {authFailed && (
              <div role="alert" style={{ color: 'red' }}>
                {t('errors.invalidFeedback')}
              </div>
            )}

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
