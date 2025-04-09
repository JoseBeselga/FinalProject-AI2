import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function FilmList() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/filmes/list');
        setFilmes(response.data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Listagem de Filmes</h1>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Foto</th>
            <th>Gênero (ID)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map(filme => (
            <tr key={filme.id}>
              <td>{filme.id}</td>
              <td>{filme.titulo}</td>
              <td>{filme.descricao}</td>
              <td>
                <img 
                  src={filme.foto || 'imagem-filme.jpg'} 
                  alt={filme.titulo} 
                  width="60"
                  style={{ objectFit: 'cover' }}
                />
              </td>
              <td>{filme.genero}</td>
              <td>
                <Link to={`/edit/${filme.id}`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <Link to="/create">Inserir Novo Filme</Link>
    </div>
  );
}

export default FilmList;
