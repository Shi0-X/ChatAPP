// frontend/src/slices/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,
  channelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (oldState, action) => {
      const { type, channelId = null } = action.payload;
      return {
        ...oldState,
        isOpen: true,
        type,
        channelId,
      };
    },
    closeModal: (oldState) => ({
      ...oldState,
      isOpen: false,
      type: null,
      channelId: null,
    }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
