import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        'Erro ao conectar com o servidor';
    return Promise.reject(new Error(errorMessage));
  }
);

export const authService = {
  register: async (username, password) => {
    const response = await api.post('/auth', { username, password });
    return response.data;
  }
};

export const postsService = {
  getAll: async () => {
    const response = await api.get('/posts');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  
  create: async (titulo, texto, usuario) => {
    const response = await api.post('/posts', { titulo, texto, usuario });
    return response.data;
  }
};

export const commentsService = {
  getByPostId: async (postId) => {
    const response = await api.get(`/comments/${postId}`);
    return response.data;
  },
  
  create: async (texto, postId, userId) => {
    const response = await api.post('/comments', { texto, postId, userId });
    return response.data;
  }
};

export default api;
