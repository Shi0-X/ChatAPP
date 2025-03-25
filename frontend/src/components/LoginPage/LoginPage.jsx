import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form as BootstrapForm } from 'react-bootstrap';

import { login as loginRequest } from '../../chatApi/api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  const [authError, setAuthError] = useState(false);
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
      setAuthError(false);
      const {
        token,
        username: returnedUser,
      } = await loginRequest(values.username, values.password);

      logIn(token, returnedUser);
      navigate('/');
    } catch (error) {
      setAuthError(true);
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
        {({ isSubmitting, errors, touched }) => (
          <Form noValidate>
            <div>
              <label htmlFor="username">{t('placeholders.username')}</label>
              <Field
                as={BootstrapForm.Control}
                id="username"
                name="username"
                type="text"
                isInvalid={touched.username && errors.username}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                <ErrorMessage name="username" />
              </BootstrapForm.Control.Feedback>
            </div>

            <div>
              <label htmlFor="password">{t('placeholders.password')}</label>
              <Field
                as={BootstrapForm.Control}
                id="password"
                name="password"
                type="password"
                isInvalid={authError || (touched.password && errors.password)}
              />
              <BootstrapForm.Control.Feedback type="invalid" style={{ display: 'block' }}>
                {authError ? t('errors.invalidFeedback') : <ErrorMessage name="password" />}
              </BootstrapForm.Control.Feedback>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t('loading') : t('entry')}
            </button>
          </Form>
        )}
      </Formik>

      <p>
        {t('noAccount')}{' '}
        <Link to="/signup">
          {t('makeRegistration')}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
