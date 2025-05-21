import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FilmesFlix</Link>
        <div className="ms-auto">
          <Link className="btn btn-sm btn-outline-light" to="/create">
            <i className="fas fa-plus me-1"></i>Novo Filme
          </Link>
        </div>
      </div>
    </nav>
  );
}