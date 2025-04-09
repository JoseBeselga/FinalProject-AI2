import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FilmList from './components/FilmList';
import FilmCreate from './components/FilmCreate';
import FilmEdit from './components/FilmEdit';


function App() {
  return (
    <Router>
      <div style={{ margin: '20px' }}>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '15px' }}>
            <li><Link to="/">Listar Filmes</Link></li>
            <li><Link to="/create">Criar Filme</Link></li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<FilmList />} />
          <Route path="/create" element={<FilmCreate />} />
          <Route path="/edit/:id" element={<FilmEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
