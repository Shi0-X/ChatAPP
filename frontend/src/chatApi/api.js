// frontend/src/chatApi/api.js
import axios from 'axios';

// Obtener el token desde localStorage
const getToken = () => localStorage.getItem('token') || null;

const api = axios.create({
  baseURL: 'http://localhost:5001/api/v1',
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
      // Borramos el token del localStorage
      localStorage.removeItem('token');
      // Forzamos al usuario a /login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ----- FUNCIONES DE LOGIN, GET CHANNELS, GET MESSAGES ----- //

// Función de Login (almacena el token correctamente)
export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token); // Se guarda el token en localStorage
    }
    console.log('✅ Login exitoso:', response.data);
    return response.data; // { token, username, ...}
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
