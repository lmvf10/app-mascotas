import React from 'react';
import './Nav.css';

function Nav() {
  return(
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <a className="navbar-brand" href="#">Veterinaria</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span classame="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/index.html">Mascotas<span
            className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/veterinarias.html">Veterinarios</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/consultas.html">Consultas</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/dueños.html">Dueños</a>
          </li>
        </ul>
        <form className="form-inline"> 
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>  
  );
}
export default Nav;
