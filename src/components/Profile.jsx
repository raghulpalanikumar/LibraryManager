import React, { useState } from 'react';
import { User, Mail, Calendar, Book, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLibrary } from '../contexts/LibraryContext';
import '../styles/profile.css';

const Profile = () => {
  const { user } = useAuth();
  const { books, getStats } = useLibrary();
  const stats = getStats();

  const [activeTab, setActiveTab] = useState('overview');

  const joinDate = new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const recentActivity = books
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    .slice(0, 5);

  const favoriteGenres = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});

  const sortedGenres = Object.entries(favoriteGenres)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="profile-container fade-in">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <div className="tabs-container">
            {['overview', 'activity', 'preferences'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div>
              <div className="stats-grid">
                <div className="stat-card">
                  <Book size={32} className="stat-icon" style={{ color: 'var(--primary-color)' }} />
                  <div className="stat-value">{stats.total}</div>
                  <div className="stat-label">Total Books</div>
                </div>

                <div className="stat-card">
                  <TrendingUp size={32} className="stat-icon" style={{ color: '#10b981' }} />
                  <div className="stat-value">{stats.completed}</div>
                  <div className="stat-label">Books Read</div>
                </div>

                <div className="stat-card">
                  <Calendar size={32} className="stat-icon" style={{ color: '#8b5cf6' }} />
                  <div className="stat-value" style={{ fontSize: '1.2rem' }}>{joinDate}</div>
                  <div className="stat-label">Member Since</div>
                </div>
              </div>

              <h3 className="section-title">Favorite Genres</h3>
              {sortedGenres.length > 0 ? (
                <div className="genre-stats">
                  {sortedGenres.map(([genre, count]) => (
                    <div key={genre} className="genre-item">
                      <div className="genre-name">{genre}</div>
                      <div className="genre-bar">
                        <div 
                          className="genre-bar-fill"
                          style={{
                            width: `${(count / Math.max(...sortedGenres.map(([,c]) => c))) * 100}%`
                          }}
                        />
                      </div>
                      <div className="genre-count">
                        {count} book{count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">Start adding books to see your favorite genres!</p>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h3 className="section-title">Recent Activity</h3>
              {recentActivity.length > 0 ? (
                <div className="activity-feed">
                  {recentActivity.map(book => (
                    <div key={book.id} className="activity-item">
                      <img
                        src={book.coverUrl || 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg'}
                        alt={book.title}
                        className="activity-cover"
                      />
                      <div className="activity-content">
                        <div className="activity-title">
                          Added "{book.title}"
                        </div>
                        <div className="activity-meta">
                          by {book.author} • {new Date(book.addedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`book-status-select status-${book.status}`}>
                        {book.status === 'to-read' && 'To Read'}
                        {book.status === 'reading' && 'Reading'}
                        {book.status === 'completed' && 'Completed'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">No activity yet. Start adding books to see your activity!</p>
              )}
            </div>
          )}

          {activeTab === 'preferences' && (
            <div>
              <h3 className="section-title">Account Information</h3>
              <div className="account-info">
                <div className="info-item">
                  <User size={20} className="info-icon" />
                  <div className="info-content">
                    <div className="info-label">Name</div>
                    <div className="info-value">{user?.name}</div>
                  </div>
                </div>
                <div className="info-item">
                  <Mail size={20} className="info-icon" />
                  <div className="info-content">
                    <div className="info-label">Email</div>
                    <div className="info-value">{user?.email}</div>
                  </div>
                </div>
                <div className="info-item">
                  <Calendar size={20} className="info-icon" />
                  <div className="info-content">
                    <div className="info-label">Member Since</div>
                    <div className="info-value">{joinDate}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;