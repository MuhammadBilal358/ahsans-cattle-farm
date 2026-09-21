import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthed, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <span className="badge">AC</span>
          <strong>Ahsan&rsquo;s Cattle Farm</strong>
        </NavLink>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Clicking any link inside closes the mobile menu */}
        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/animals/cattle">Cattle</NavLink>
          <NavLink to="/animals/dairy">Dairy</NavLink>
          <NavLink to="/animals/goats">Goats</NavLink>
          <NavLink to="/animals/feed">Feed</NavLink>
          <NavLink to="/animals/milk">Products</NavLink>
          <NavLink to="/animals/services">Services</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {isAuthed ? (
            <>
              <NavLink to="/admin" end>Admin</NavLink>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink to="/admin/login">Login</NavLink>
          )}
        </nav>

        <a href="tel:03073777444" className="navbar-call">
          Call 0307-3777444
        </a>
      </div>
    </header>
  );
}
