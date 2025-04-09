import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function FilmEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({
    titulo: '',
    descricao: '',
    foto: '',
    genero: ''
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/filmes/get/${id}`);
        setFilme(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do filme:", error);
      }
    })();
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
      console.error("Erro ao atualizar filme:", error);
    }
  };

  return (
    <div>
      <h1>Editar Filme</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label><br/>
          <input type="text" name="titulo" value={filme.titulo} onChange={handleChange} required />
        </div>
        <div>
          <label>Descrição:</label><br/>
          <textarea name="descricao" value={filme.descricao} onChange={handleChange} required />
        </div>
        <div>
          <label>Foto (URL ou nome do arquivo):</label><br/>
          <input type="text" name="foto" value={filme.foto} onChange={handleChange} />
        </div>
        <div>
          <label>Gênero (ID):</label><br/>
          <input type="number" name="genero" value={filme.genero} onChange={handleChange} required />
        </div>
        <br/>
        <button type="submit">Atualizar Filme</button>
      </form>
    </div>
  );
}

export default FilmEdit;
