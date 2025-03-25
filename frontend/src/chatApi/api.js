// frontend/src/chatApi/api.js
import axios from 'axios';

const getToken = () => localStorage.getItem('token') || null;

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (cfg) => {
    // Creamos una copia para no mutar 'cfg'
    const newCfg = { ...cfg };
    const token = getToken();
    if (token) {
      newCfg.headers = {
        ...newCfg.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return newCfg;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Opción #1: Solo redirige a /login si YA había un token (usuario logueado).
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

// ----- FUNCIONES DE LOGIN, SIGNUP, GET CHANNELS, GET MESSAGES ----- //
export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    console.log('=== Respuesta del servidor al login ===', response.data);

    const { token, username: returnedUser } = response.data || {};
    console.log('Desestructurado: token=', token, 'username=', returnedUser);

    if (token && returnedUser) {
      console.log('Guardando en localStorage:', token, returnedUser);
      localStorage.setItem('token', token);
      localStorage.setItem('username', returnedUser);
    } else {
      console.warn('El servidor no devolvió username o token');
    }

    console.log('✅ Login exitoso:', response.data);
    return response.data;
  } catch (error) {
    console.error('🚨 Error en login:', error);
    throw error;
  }
};

export const signup = async (username, password) => {
  const response = await api.post('/signup', { username, password });
  return response.data;
};

export const getChannels = async () => {
  try {
    const response = await api.get('/channels');
    console.log('✅ Canales obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('🚨 Error al obtener canales:', error);
    throw error;
  }
};

export const getMessages = async () => {
  try {
    const response = await api.get('/messages');
    console.log('✅ Mensajes obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('🚨 Error al obtener mensajes:', error);
    throw error;
  }
};

export default api;
