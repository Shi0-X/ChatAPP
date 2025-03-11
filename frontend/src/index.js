// frontend/src/index.js
// import React from 'react'; // Se elimina si no usamos React directamente
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import init from './init.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

init().then((vdom) => {
  root.render(vdom);
});

reportWebVitals();
