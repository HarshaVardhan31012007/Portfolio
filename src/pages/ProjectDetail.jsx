import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TechStackList from '../components/TechStackList';
import LoadingSpinner from '../components/LoadingSpinner';
import { API_BASE_URL } from '../config';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      setIsLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const [response] = await Promise.all([
          fetch(`${API_BASE_URL}/api/projects/${projectId}`),
          new Promise(resolve => setTimeout(resolve, 300))
        ]);
        
        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch project details`);
        }

        const data = await response.json();
        setProject(data);
      } catch (err) {
        console.error(`Error fetching project ${projectId}:`, err);
        setError(err.message || 'Unable to connect to Express backend server.');
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchProjectDetail();
    }
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="section-container">
        <LoadingSpinner message={`Fetching project "${projectId}" from Backend API...`} />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="section-container">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h2 style={{ color: '#ef4444' }}>Project Not Found</h2>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
            No project matches the specified ID "{projectId}" on the API server.
          </p>
          <Link to="/projects" className="btn btn-primary">
            &larr; Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-container">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h2 style={{ color: '#ef4444' }}>Error Loading Project</h2>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
            {error}
          </p>
          <Link to="/projects" className="btn btn-primary">
            &larr; Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="section-container">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/projects" className="btn btn-secondary btn-sm">
            &larr; Back to All Projects
          </Link>
        </div>

        <article className="glass-card" style={{ padding: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span className="edu-badge">{project.category}</span>
              <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{project.title}</h1>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Repository
                </a>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
              Overview
            </h3>
            <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              {project.fullDescription}
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
              Tech Stack &amp; Tools
            </h3>
            <TechStackList techStack={project.techStack} />
          </div>

          {project.achievements && project.achievements.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
                Key Engineering Achievements
              </h3>
              <ul className="project-achievements" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                {project.achievements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
                Architecture Highlights
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {project.architectureHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      padding: '1rem',
                      borderRadius: '12px',
                      color: 'var(--text-muted)',
                      fontSize: '0.92rem'
                    }}
                  >
                    &#9656; {highlight}
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default ProjectDetail;
