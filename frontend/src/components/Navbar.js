import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FilmesFlix</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto">
            <Link className="nav-link me-3" to="/">Home</Link>
            <Link className="btn btn-sm btn-outline-light" to="/create">
              <i className="fas fa-plus me-1"></i>Novo Filme
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}