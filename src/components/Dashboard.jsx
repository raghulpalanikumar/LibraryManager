import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, BookOpen, Clock, CircleCheck as CheckCircle, TrendingUp, Plus } from 'lucide-react';
import { useLibrary } from '../contexts/LibraryContext';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { books, getStats } = useLibrary();
  const stats = getStats();

  const recentBooks = books.slice(-3).reverse();

  useEffect(() => {
    // Add fade-in animation to stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
      card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
      card.style.opacity = '0';
    });
  }, []);

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome back, {user?.name}!</h1>
        <p className="dashboard-subtitle">
          Here's an overview of your personal library
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe', color: '#1e40af' }}>
            <Book size={24} />
          </div>
          <div className="stat-number" style={{ color: '#1e40af' }}>{stats.total}</div>
          <div className="stat-label">Total Books</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#92400e' }}>
            <Clock size={24} />
          </div>
          <div className="stat-number" style={{ color: '#92400e' }}>{stats.toRead}</div>
          <div className="stat-label">To Read</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#bfdbfe', color: '#1d4ed8' }}>
            <BookOpen size={24} />
          </div>
          <div className="stat-number" style={{ color: '#1d4ed8' }}>{stats.reading}</div>
          <div className="stat-label">Currently Reading</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#d1fae5', color: '#065f46' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-number" style={{ color: '#065f46' }}>{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0e7ff', color: '#5b21b6' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-number" style={{ color: '#5b21b6' }}>{stats.genres}</div>
          <div className="stat-label">Genres</div>
        </div>
      </div>

      <div className="recent-books-section">
        <div className="section-header">
          <h2 className="section-title">Recently Added</h2>
          <Link to="/add-book" className="btn btn-primary btn-small">
            <Plus size={16} />
            Add Book
          </Link>
        </div>

        {recentBooks.length === 0 ? (
          <div className="empty-state">
            <Book size={48} className="empty-state-icon" />
            <h3 className="empty-state-title">No books added yet</h3>
            <p className="empty-state-description">Start building your library by adding your first book!</p>
            <Link to="/add-book" className="btn btn-primary">
              <Plus size={16} />
              Add Your First Book
            </Link>
          </div>
        ) : (
          <div className="books-grid">
            {recentBooks.map(book => (
              <div key={book.id} className="book-card">
                <img
                  src={book.coverUrl || 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg'}
                  alt={book.title}
                  className="book-cover"
                />
                <div className="book-content">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <span className={`book-status status-${book.status}`}>
                    {book.status === 'to-read' && 'To Read'}
                    {book.status === 'reading' && 'Reading'}
                    {book.status === 'completed' && 'Completed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;