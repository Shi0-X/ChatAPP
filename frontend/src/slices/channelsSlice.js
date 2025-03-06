// slices/channelsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchInitialData,
  addChannel,
  removeChannel,
  renameChannel,
} from './thunks.js';

const initialState = {
  items: [], // array de canales
  currentChannelId: null, // canal actual
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Al cargar canales y mensajes
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        state.items = channels;

        if (currentChannelId) {
          state.currentChannelId = currentChannelId;
        } else {
          // busca 'general'
          const generalChannel = state.items.find((ch) => ch.name === 'general');
          if (generalChannel) {
            state.currentChannelId = generalChannel.id;
          }
        }
      })

      // Al crear un canal
      .addCase(addChannel.fulfilled, (state, action) => {
        const newChannel = action.payload; // { id, name, removable: true, ... }
        state.items.push(newChannel);
        // Mover al usuario al nuevo canal
        state.currentChannelId = newChannel.id;
      })

      // Al eliminar un canal
      .addCase(removeChannel.fulfilled, (state, action) => {
        const { id: removedId } = action.payload; // { id: <canalEliminado> }
        // Filtrar el canal
        state.items = state.items.filter((ch) => ch.id !== removedId);

        // Si era el canal actual, mover a 'general'
        if (state.currentChannelId === removedId) {
          const generalChannel = state.items.find((ch) => ch.name === 'general');
          if (generalChannel) {
            state.currentChannelId = generalChannel.id;
          } else {
            // fallback
            state.currentChannelId = null;
          }
        }
      })

      // Al renombrar un canal
      .addCase(renameChannel.fulfilled, (state, action) => {
        const updated = action.payload; // { id, name, ... }
        const channelIndex = state.items.findIndex((ch) => ch.id === updated.id);
        if (channelIndex !== -1) {
          state.items[channelIndex].name = updated.name;
        }
      });
  },
});

export const { setCurrentChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;
