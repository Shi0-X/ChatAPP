// slices/channelsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialData } from './thunks.js';

const initialState = {
  items: [], // array de canales
  currentChannelId: null, // canal actual (por defecto será 'general')
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    // Podrías agregar una acción para cambiar de canal, si quisieras:
    // setCurrentChannelId: (state, action) => { state.currentChannelId = action.payload; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      // action.payload = { channels, messages, currentChannelId? ...}
      state.items = action.payload.channels;

      // Si el backend envía un currentChannelId, úsalo:
      if (action.payload.currentChannelId) {
        state.currentChannelId = action.payload.currentChannelId;
      } else {
        // De lo contrario, encuentra el canal "general"
        // Suponiendo que 'general' existe en la lista:
        const generalChannel = state.items.find((ch) => ch.name === 'general');
        // Si existe, setea currentChannelId con su id:
        if (generalChannel) {
          state.currentChannelId = generalChannel.id;
        }
      }
    });
  },
});

// Si deseas exportar la acción para cambiar de canal:
// export const { setCurrentChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;
