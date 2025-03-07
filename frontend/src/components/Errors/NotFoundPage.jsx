// src/components/Errors/NotFoundPage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div>
      {/* "404 - Página no encontrada" => t('pageNotFound') => "Page not found" */}
      <h2>404 - {t('pageNotFound')}</h2>
      {/* "La ruta a la que intentas acceder no existe." => t('redirect') + t('mainPage') si quieres */}
      <p>
        {t('redirect')}
        <a href="/">{t('mainPage')}</a>
      </p>
    </div>
  );
}

export default NotFoundPage;
