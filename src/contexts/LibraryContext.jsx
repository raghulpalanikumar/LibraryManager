import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const LibraryContext = createContext();

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadBooks();
    }
  }, [user]);

  const loadBooks = () => {
    if (!user) return;
    
    const savedBooks = localStorage.getItem(`library_books_${user.id}`);
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  };

  const saveBooks = (updatedBooks) => {
    if (!user) return;
    
    localStorage.setItem(`library_books_${user.id}`, JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  const addBook = (bookData) => {
    const newBook = {
      id: Date.now().toString(),
      ...bookData,
      addedDate: new Date().toISOString(),
      userId: user.id
    };

    const updatedBooks = [...books, newBook];
    saveBooks(updatedBooks);
    return newBook;
  };

  const updateBook = (bookId, updates) => {
    const updatedBooks = books.map(book =>
      book.id === bookId ? { ...book, ...updates } : book
    );
    saveBooks(updatedBooks);
  };

  const deleteBook = (bookId) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    saveBooks(updatedBooks);
  };

  const getBooksByStatus = (status) => {
    return books.filter(book => book.status === status);
  };

  const searchBooks = (query) => {
    if (!query) return books;
    
    const lowercaseQuery = query.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.genre.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getStats = () => {
    return {
      total: books.length,
      toRead: getBooksByStatus('to-read').length,
      reading: getBooksByStatus('reading').length,
      completed: getBooksByStatus('completed').length,
      genres: [...new Set(books.map(book => book.genre))].length
    };
  };

  const value = {
    books,
    loading,
    addBook,
    updateBook,
    deleteBook,
    getBooksByStatus,
    searchBooks,
    getStats
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};