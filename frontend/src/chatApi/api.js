// frontend/src/chatApi/api.js
import axios from 'axios';

// Obtener el token desde localStorage
const getToken = () => localStorage.getItem('token') || null;

// Ruta base RELATIVA => '/api/v1'
const api = axios.create({
  baseURL: '/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Si tu backend requiere cookies
});

// Interceptor de petición: agregar Authorization si hay token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor de respuesta: manejar 401 (token inválido o expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Borramos el token y username
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ----- FUNCIONES DE LOGIN, GET CHANNELS, GET MESSAGES ----- //

// Función de Login
export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    // Log para ver la respuesta exacta del servidor:
    console.log('=== Respuesta del servidor al login ===', response.data);

    // Suponiendo que el backend manda { token, username }
    const { token, username: returnedUser } = response.data || {};

    console.log('Desestructurado: token=', token, 'username=', returnedUser);

    // Si hay token y username, los guardamos en localStorage
    if (token && returnedUser) {
      console.log('Guardando en localStorage:', token, returnedUser);
      localStorage.setItem('token', token);
      localStorage.setItem('username', returnedUser);
    } else {
      console.warn('El servidor no devolvió username o token');
    }

    console.log('✅ Login exitoso:', response.data);
    return response.data; // { token, username: returnedUser, ...}
  } catch (error) {
    console.error('🚨 Error en login:', error);
    throw error;
  }
};

// Función para obtener los canales
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

// Función para obtener los mensajes
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
