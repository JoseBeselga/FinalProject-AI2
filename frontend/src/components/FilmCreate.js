import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function FilmCreate() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState('');
  const [genero, setGenero] = useState('');
  const [listaGeneros, setListaGeneros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/generos/list')
      .then(res => setListaGeneros(res.data))
      .catch(err => console.error('Erro ao buscar gêneros:', err));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/filmes/create', { titulo, descricao, foto, genero });
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar filme:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Criar Novo Filme</h1>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="col-md-12">
          <label className="form-label">Descrição:</label>
          <textarea
            className="form-control"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Foto (URL):</label>
          <input
            type="text"
            className="form-control"
            value={foto}
            onChange={e => setFoto(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Gênero:</label>
          <select
            className="form-select"
            value={genero}
            onChange={e => setGenero(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            {listaGeneros.map(g => (
              <option key={g.id} value={g.id}>{g.descricao}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Criar Filme</button>
        </div>
      </form>
    </div>
  );
}

export default FilmCreate;