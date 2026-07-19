// src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.js';
import { useAuth } from '../../contexts/AuthContext.js';
import './Navbar.css';

export default function Navbar() {
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__row">
        <Link to="/" className="navbar__mark" onClick={() => setMenuOpen(false)}>
          MARQUE
        </Link>

        <button
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`navbar__links ${menuOpen ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>
            Catalog
          </NavLink>
          {isAuthenticated ? (
            <>
              <span className="navbar__user">Hi, {user.name.split(' ')[0]}</span>
              <button className="navbar__linklike" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Log in
            </NavLink>
          )}
          <Link to="/cart" className="navbar__cart" onClick={() => setMenuOpen(false)}>
            Bag
            <span className="navbar__stamp" aria-hidden="true">
              {itemCount}
            </span>
            <span className="visually-hidden">items in bag</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
