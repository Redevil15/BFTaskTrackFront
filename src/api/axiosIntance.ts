import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://bftasktrackback.onrender.com' // URL del servidor de Render en producción
      : 'http://localhost:8000', // URL del servidor local
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
