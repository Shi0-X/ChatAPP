// src/components/Errors/NotFoundPage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>
        404 -
        {' '}
        {t('pageNotFound')}
      </h2>
      <p>
        {t('redirect')}
        {' '}
        <a href="/">{t('mainPage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
