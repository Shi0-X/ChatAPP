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
    messageReceived: (oldState, action) => ({
      ...oldState,
      items: [...oldState.items, action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (oldState, action) => ({
      ...oldState,
      items: action.payload.messages,
    }));
  },
});

export const { messageReceived } = messagesSlice.actions;
export default messagesSlice.reducer;
