import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('library_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication
    const users = JSON.parse(localStorage.getItem('library_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userWithoutPassword = { id: user.id, name: user.name, email: user.email };
      setUser(userWithoutPassword);
      localStorage.setItem('library_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('library_users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('library_users', JSON.stringify(users));

    const userWithoutPassword = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userWithoutPassword);
    localStorage.setItem('library_user', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('library_user');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};