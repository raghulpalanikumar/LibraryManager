import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LibraryProvider } from './contexts/LibraryContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import './styles/layout.css';
import './styles/components.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      {user && <Navbar />}
      <main className={user ? "main-content" : "page-container"}>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/books" element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          } />
          <Route path="/add-book" element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LibraryProvider>
          <AppContent />
        </LibraryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;