// frontend/src/slices/index.js (ejemplo)
import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalReducer from './modalSlice.js'; // <-- Importa tu modalSlice

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer, // <-- Asegúrate de añadirlo
  },
});
