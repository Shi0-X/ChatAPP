// frontend/src/slices/thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'; // Importar
import i18n from 'i18next'; // Para usar i18n.t() en un thunk sin hooks
import fetchData from '../chatApi/fetchData.js';
import api from '../chatApi/api.js';

export const fetchInitialData = createAsyncThunk(
  'data/fetchInitialData',
  async () => {
    try {
      const data = await fetchData();
      return data;
    } catch (err) {
      // Notificar error de carga
      toast.error(i18n.t('errors.network')); // "Connection error"
      throw err;
    }
  },
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
  },
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
  },
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
  },
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
  },
);
