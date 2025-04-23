import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { deleteFilme } from '../services/api';

export default function FilmList() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState({});

  useEffect(() => {
    async function load() {
      const [fRes, gRes] = await Promise.all([
        api.get('/filmes/list'),
        api.get('/generos/list')
      ]);
      setFilmes(fRes.data);
      const map = {};
      gRes.data.forEach(g => map[g.id] = g.descricao);
      setGeneros(map);
    }
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmar exclusão?')) return;
    await deleteFilme(id);
    setFilmes(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="movie-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {filmes.map(f => (
        <div className="col" key={f.id}>
          <div className="card movie-card">
            <img src={f.foto || '/imagem-filme.jpg'} alt={f.titulo} />
            <div className="movie-info">
              <h5 className="movie-title">{f.titulo}</h5>
              <p className="movie-genre">{generos[f.genero]}</p>
              <div className="movie-actions">
                <Link className="btn btn-sm btn-outline-warning" to={`/edit/${f.id}`}>Editar</Link>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(f.id)}>Excluir</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}