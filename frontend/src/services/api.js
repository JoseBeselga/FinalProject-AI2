import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

export const deleteFilme = (id) => {
  return api.delete(`/filmes/filmes/delete/${id}`);
};

export default api;