import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // Altere para o seu backend
});

// Interceptor para incluir o token JWT nas requisições
api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;