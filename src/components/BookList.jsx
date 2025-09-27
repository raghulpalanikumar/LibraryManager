import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ListFilter as Filter, Plus, CreditCard as Edit, Trash2, Book } from 'lucide-react';
import { useLibrary } from '../contexts/LibraryContext';
import '../styles/books.css';

const BookList = () => {
  const { books, updateBook, deleteBook } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');

  const genres = [...new Set(books.map(book => book.genre))].sort();

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    const matchesGenre = genreFilter === 'all' || book.genre === genreFilter;
    
    return matchesSearch && matchesStatus && matchesGenre;
  });

  const handleStatusChange = (bookId, newStatus) => {
    updateBook(bookId, { status: newStatus });
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(bookId);
    }
  };

  return (
    <div className="books-container fade-in">
      <div className="books-header">
        <h1 className="books-title">My Books</h1>
        <Link to="/add-book" className="btn btn-primary">
          <Plus size={20} />
          Add Book
        </Link>
      </div>

      <div className="search-bar">
        <div className="search-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search books, authors, or genres..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="filter-select"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="all">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <Book size={48} className="empty-state-icon" />
          <p className="empty-state-text">
            {searchQuery || statusFilter !== 'all' || genreFilter !== 'all' 
              ? 'No books match your search criteria'
              : 'No books in your library yet'
            }
          </p>
          <Link to="/add-book" className="btn btn-primary">
            <Plus size={16} />
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              <img
                src={book.coverUrl || 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg'}
                alt={book.title}
                className="book-cover"
              />
              <div className="book-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-metadata">
                  {book.genre} • {book.pages} pages
                </p>
                
                <select
                  value={book.status}
                  onChange={(e) => handleStatusChange(book.id, e.target.value)}
                  className={`book-status-select status-${book.status}`}
                >
                  <option value="to-read">To Read</option>
                  <option value="reading">Reading</option>
                  <option value="completed">Completed</option>
                </select>

                {book.description && (
                  <p className="book-description">
                    {book.description}
                  </p>
                )}

                <div className="book-actions">
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="btn btn-danger btn-small"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;