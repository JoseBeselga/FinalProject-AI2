import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { deleteFilme } from '../services/api';

function FilmList() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState({});

  useEffect(() => {
    async function fetchData() {
      const [filmesRes, generosRes] = await Promise.all([
        api.get('/filmes/list'),
        api.get('/generos/list')
      ]);
      setFilmes(filmesRes.data);

      const map = {};
      generosRes.data.forEach(g => { map[g.id] = g.descricao; });
      setGeneros(map);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir este filme?')) return;
    await deleteFilme(id);
    setFilmes(filmes.filter(f => f.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {filmes.map(filme => (
          <div className="col" key={filme.id}>
            <div className="card movie-card h-100 text-white">
              <img
                src={filme.foto || '/imagem-filme.jpg'}
                className="card-img-top"
                alt={filme.titulo}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="movie-title flex-grow-1">{filme.titulo}</h5>
                <div className="d-flex justify-content-between">
                  <Link
                    className="btn btn-sm btn-warning"
                    to={`/edit/${filme.id}`}
                  >Editar</Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(filme.id)}
                  >Excluir</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmList;