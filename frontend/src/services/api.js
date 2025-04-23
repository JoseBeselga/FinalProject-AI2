import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

export const deleteFilme = async (id) => {
  // Ajuste para rota correta no backend: /filmes/filmes/delete/:id
  return api.delete(`/filmes/filmes/delete/${id}`);
};

export default api;