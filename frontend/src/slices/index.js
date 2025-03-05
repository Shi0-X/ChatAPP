// slices/index.js
import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
// import modalReducer from './modalSlice.js' si luego manejas modales

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    // modal: modalReducer,
  },
});
