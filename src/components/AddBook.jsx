import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Save } from 'lucide-react';
import { useLibrary } from '../contexts/LibraryContext';
import '../styles/forms.css';

const AddBook = () => {
  const navigate = useNavigate();
  const { addBook } = useLibrary();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    pages: '',
    isbn: '',
    coverUrl: '',
    description: '',
    status: 'to-read'
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const newBook = addBook({
        ...formData,
        pages: parseInt(formData.pages) || 0
      });

      setSuccess('Book added successfully!');
      
      setTimeout(() => {
        navigate('/books');
      }, 1500);
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container fade-in">
      <div className="add-book-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <BookOpen size={48} style={{ color: '#1e40af', margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            Add New Book
          </h1>
          <p style={{ color: '#6b7280' }}>
            Add a new book to your personal library
          </p>
        </div>

        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter book title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author" className="form-label">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                className="form-input"
                value={formData.author}
                onChange={handleInputChange}
                required
                placeholder="Enter author name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="genre" className="form-label">Genre *</label>
              <input
                type="text"
                id="genre"
                name="genre"
                className="form-input"
                value={formData.genre}
                onChange={handleInputChange}
                required
                placeholder="e.g., Fiction, Mystery, Romance"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pages" className="form-label">Pages</label>
              <input
                type="number"
                id="pages"
                name="pages"
                className="form-input"
                value={formData.pages}
                onChange={handleInputChange}
                placeholder="Number of pages"
                min="1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                className="form-input"
                value={formData.isbn}
                onChange={handleInputChange}
                placeholder="ISBN number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                name="status"
                className="form-input"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="to-read">To Read</option>
                <option value="reading">Reading</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="coverUrl" className="form-label">Cover Image URL</label>
            <input
              type="url"
              id="coverUrl"
              name="coverUrl"
              className="form-input"
              value={formData.coverUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter book description or notes..."
              rows="4"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
              ) : (
                <>
                  <Save size={20} />
                  Add Book
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;