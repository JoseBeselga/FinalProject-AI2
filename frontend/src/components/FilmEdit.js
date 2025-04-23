import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function FilmEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({ titulo: '', descricao: '', foto: '', genero: '' });
  const [listaGeneros, setListaGeneros] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [filmeRes, generosRes] = await Promise.all([
          api.get(`/filmes/get/${id}`),
          api.get('/generos/list')
        ]);
        setFilme(filmeRes.data);
        setListaGeneros(generosRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = e => {
    setFilme({ ...filme, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put(`/filmes/update/${id}`, filme);
      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar filme:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Editar Filme</h1>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            name="titulo"
            value={filme.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label className="form-label">Descrição:</label>
          <textarea
            className="form-control"
            name="descricao"
            value={filme.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Foto (URL):</label>
          <input
            type="text"
            className="form-control"
            name="foto"
            value={filme.foto}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Gênero:</label>
          <select
            className="form-select"
            name="genero"
            value={filme.genero}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {listaGeneros.map(g => (
              <option key={g.id} value={g.id}>{g.descricao}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Atualizar Filme</button>
        </div>
      </form>
    </div>
  );
}

export default FilmEdit;
