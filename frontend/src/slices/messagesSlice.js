// frontend/src/slices/messagesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialData } from './thunks.js';

const initialState = {
  items: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // Acción sincrónica: se usa cuando llega un 'newMessage' por socket
    messageReceived: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        // action.payload.messages es un array
        state.items = action.payload.messages;
      });
  },
});

export const { messageReceived } = messagesSlice.actions;
export default messagesSlice.reducer;
