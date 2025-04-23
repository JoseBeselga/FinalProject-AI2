import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FilmesFlix</Link>
        <div className="ms-auto">
          <Link className="btn btn-sm btn-outline-light me-2" to="/">Home</Link>
          <Link className="btn btn-sm btn-outline-danger" to="/create">+ Novo Filme</Link>
        </div>
      </div>
    </nav>
  );
}