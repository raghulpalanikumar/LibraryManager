import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Hop as Home, Book, Plus, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2 className="brand-title">
          <BookOpen size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
          MyLibrary
        </h2>
      </div>

      <div className="nav-menu">
        <Link
          to="/dashboard"
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <Home size={20} />
          Dashboard
        </Link>

        <Link
          to="/books"
          className={`nav-item ${isActive('/books') ? 'active' : ''}`}
        >
          <Book size={20} />
          My Books
        </Link>

        <Link
          to="/add-book"
          className={`nav-item ${isActive('/add-book') ? 'active' : ''}`}
        >
          <Plus size={20} />
          Add Book
        </Link>

        <Link
          to="/profile"
          className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
        >
          <User size={20} />
          Profile
        </Link>
      </div>

      <div className="navbar-footer">
        <div style={{ marginBottom: '1rem', padding: '0.5rem 0' }}>
          <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
            {user?.name}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {user?.email}
          </div>
        </div>
        <button
          onClick={logout}
          className="nav-item"
          style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left' }}
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;