import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FilmList from './components/FilmList';
import FilmCreate from './components/FilmCreate';
import FilmEdit from './components/FilmEdit';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FilmList />} />
        <Route path="/create" element={<FilmCreate />} />
        <Route path="/edit/:id" element={<FilmEdit />} />
      </Routes>
    </Router>
  );
}

export default App;