import React, { useState, useEffect } from 'react';
import ProjectList from '../components/ProjectList';
import LoadingSpinner from '../components/LoadingSpinner';
import { API_BASE_URL } from '../config';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load projects from server`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Unable to connect to Express backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const categories = ['All', 'Backend & Systems', 'Algorithms & Search', 'AI & Distributed Systems', 'Algorithms & Web'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="section-container">
      <div className="container">
        <div className="section-header">
          <h2>Engineering Projects</h2>
          <p className="section-subtitle">
            Explore scalable backend platforms, optimal search engines, and open-source contributions.
          </p>
          <div className="header-line"></div>
        </div>

        {/* Category Filter Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '20px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State Indicator */}
        {isLoading && <LoadingSpinner message="Fetching projects from Express Backend API..." />}

        {/* Error State Banner */}
        {error && (
          <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.05)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Backend Connection Error</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Failed to load projects from <code>{API_BASE_URL}/api/projects</code> ({error})
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Please ensure the Express backend server is running in <code>/server</code> (e.g. <code>npm start</code>).
            </p>
            <button onClick={fetchProjects} className="btn btn-primary btn-sm">
              &orarr; Retry Connection
            </button>
          </div>
        )}

        {/* Project List */}
        {!isLoading && !error && (
          <ProjectList projects={filteredProjects} />
        )}
      </div>
    </div>
  );
};

export default Projects;
