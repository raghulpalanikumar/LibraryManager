import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-image-section">
        <div className="auth-image-content">
          <h1 className="auth-image-title">Welcome Back to MyLibrary</h1>
          <p className="auth-image-text">
            Sign in to access your personal library, continue your reading journey, and explore your collection of books.
          </p>
        </div>
      </div>
      <div className="auth-form-section">
        <div className="auth-card">
          <div className="auth-header">
            <BookOpen size={48} style={{ color: '#1e40af', margin: '0 auto 1rem' }} />
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your personal library</p>
          </div>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="auth-link">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;