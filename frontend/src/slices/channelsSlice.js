// slices/channelsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialData } from './thunks.js';

const initialState = {
  items: [], // array de canales
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      // action.payload debe contener { channels: [...] }
      state.items = action.payload.channels; 
    });
  },
});

export default channelsSlice.reducer;
