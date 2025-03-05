// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import init from './init.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

// init() puede ser async, por si cargas i18n u otras cosas
init().then((vdom) => {
  root.render(vdom);
});

reportWebVitals();
