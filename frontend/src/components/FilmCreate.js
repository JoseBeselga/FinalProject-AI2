import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function FilmCreate() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState('');
  const [genero, setGenero] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [listaGeneros, setListaGeneros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGeneros() {
      try {
        const res = await api.get('/generos/list');
        setListaGeneros(res.data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    }
    fetchGeneros();
  }, []);

  const handleGeneroChange = e => {
    const val = e.target.value;
    if (val === 'new') {
      setIsNew(true);
      setGenero('');
    } else {
      setIsNew(false);
      setGenero(val);
      setNovaCategoria('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let genreId = genero;
      if (isNew) {
        if (!novaCategoria.trim()) {
          alert('Por favor, insira a descrição da nova categoria.');
          return;
        }
        const resp = await api.post('/generos/create', { descricao: novaCategoria.trim() });
        genreId = resp.data.id;
      }
      await api.post('/filmes/create', { titulo, descricao, foto, genero: genreId });
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar filme:', error);
      alert('Ocorreu um erro ao criar o filme. Veja o console para mais detalhes.');
    }
  };

  return (
    <div className="container p-4">
      <h2>Criar Novo Filme</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            id="titulo"
            type="text"
            className="form-control"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="descricao" className="form-label">Descrição</label>
          <textarea
            id="descricao"
            className="form-control"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="foto" className="form-label">Foto (URL)</label>
          <input
            id="foto"
            type="url"
            className="form-control"
            value={foto}
            onChange={e => setFoto(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="genero" className="form-label">Categoria</label>
          <select
            id="genero"
            className="form-select"
            value={isNew ? 'new' : genero}
            onChange={handleGeneroChange}
            required
          >
            <option value="">-- Selecionar --</option>
            {listaGeneros.map(g => (
              <option key={g.id} value={g.id}>{g.descricao}</option>
            ))}
            <option value="new">+ Nova categoria</option>
          </select>
        </div>
        {isNew && (
          <div className="col-12">
            <label htmlFor="novaCategoria" className="form-label">Descrição nova categoria</label>
            <input
              id="novaCategoria"
              type="text"
              className="form-control"
              value={novaCategoria}
              onChange={e => setNovaCategoria(e.target.value)}
              required
            />
          </div>
        )}
        <div className="col-12">
          <button type="submit" className="btn btn-success">Criar Filme</button>
        </div>
      </form>
    </div>
  );
}