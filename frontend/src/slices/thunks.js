// frontend/src/slices/thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchData from '../chatApi/fetchData.js';
import api from '../chatApi/api.js';

// Carga inicial: { channels, messages }
export const fetchInitialData = createAsyncThunk(
  'data/fetchInitialData',
  async () => {
    // GET /channels y /messages
    const data = await fetchData();
    return data; // => { channels, messages, currentChannelId? }
  }
);

// Crear mensaje
export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ channelId, body, username }, { rejectWithValue }) => {
    try {
      const response = await api.post('/messages', { body, channelId, username });
      console.log('addMessage server response:', response.data);
      return response.data; // => { id, body, channelId, username, ... }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ================== NUEVOS THUNKS PARA CANALES ================== //

// Crear canal
export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ name }, { rejectWithValue }) => {
    try {
      // POST /api/v1/channels
      // body: { name }
      const response = await api.post('/channels', { name });
      console.log('addChannel server response:', response.data);
      return response.data; // => { id, name, removable: true, ... }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Eliminar canal
export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ id }, { rejectWithValue }) => {
    try {
      // DELETE /api/v1/channels/:id
      const response = await api.delete(`/channels/${id}`);
      console.log('removeChannel server response:', response.data);
      return response.data; // => { id: <canalEliminado> }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Renombrar canal
export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, newName }, { rejectWithValue }) => {
    try {
      // PATCH /api/v1/channels/:id
      // body: { name: newName }
      const response = await api.patch(`/channels/${id}`, { name: newName });
      console.log('renameChannel server response:', response.data);
      return response.data; // => { id, name, ... }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
