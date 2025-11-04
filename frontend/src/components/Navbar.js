import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Meu Blog
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              Todos os Posts
            </Link>
          </li>
          <li>
            <Link to="/criar-post" className="navbar-link">
              Criar Post
            </Link>
          </li>
          <li>
            <Link to="/cadastro" className="navbar-link">
              Cadastro
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
