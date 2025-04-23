import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-netflix p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FilmesFlix</Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/">Home</Link>
          <Link className="btn btn-outline-light" to="/create">Novo Filme</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;