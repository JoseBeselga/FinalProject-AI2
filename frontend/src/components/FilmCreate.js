import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function FilmCreate() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState('');
  const [genero, setGenero] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/filmes/create', { titulo, descricao, foto, genero });
      navigate('/');
    } catch (error) {
      console.error("Erro ao criar filme:", error);
    }
  };

  return (
    <div>
      <h1>Criar Novo Filme</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label><br/>
          <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label><br/>
          <textarea value={descricao} onChange={e => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Foto (URL ou nome do arquivo):</label><br/>
          <input type="text" value={foto} onChange={e => setFoto(e.target.value)} />
        </div>
        <div>
          <label>Gênero (ID):</label><br/>
          <input type="number" value={genero} onChange={e => setGenero(e.target.value)} required />
        </div>
        <br/>
        <button type="submit">Criar Filme</button>
      </form>
    </div>
  );
}

export default FilmCreate;
