// frontend/src/slices/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,        // 'addChannel', 'removeChannel', 'renameChannel'
  channelId: null,   // id del canal involucrado
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, channelId = null } = action.payload;
      state.isOpen = true;
      state.type = type;
      state.channelId = channelId;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
