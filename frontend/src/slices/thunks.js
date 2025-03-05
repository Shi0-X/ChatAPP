// frontend/src/slices/thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchData from '../chatApi/fetchData.js';
import api from '../chatApi/api.js';

// Carga inicial: { channels, messages }
export const fetchInitialData = createAsyncThunk(
  'data/fetchInitialData',
  async () => {
    // GET /channels y /messages
    // fetchData() hace GET /api/v1/channels y GET /api/v1/messages
    const data = await fetchData();
    return data; // => { channels, messages }
  }
);

// Crear mensaje vía POST /api/v1/messages
export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ channelId, body, username }, { rejectWithValue }) => {
    try {
      // Ajuste: La ruta real es /api/v1/messages, no /channels/:channelId/messages
      const response = await api.post('/messages', { body, channelId, username });
      console.log('addMessage server response:', response.data);
      // El servidor emite "newMessage" internamente con response.data
      return response.data; // => { id, body, channelId, username, ... }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
