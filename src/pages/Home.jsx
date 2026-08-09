import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkillsSection from '../components/SkillsSection';
import ProjectList from '../components/ProjectList';
import LoadingSpinner from '../components/LoadingSpinner';
import { projectsData } from '../data/projects';

const Home = () => {
  // State: Loading state simulation for Assignment Spec 2.3
  const [isLoading, setIsLoading] = useState(true);

  // Side Effect 1: Simulate brief loading sequence on component mount
  useEffect(() => {
    // Delay showing content by ~800ms to fulfill assignment spec 2.3
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Mandatory cleanup function to prevent memory leak
    return () => {
      clearTimeout(timer);
    };
  }, []); // Empty dependency array [] -> runs once on mount

  // Filter featured projects for home page
  const featuredProjects = projectsData.filter(p => p.isFeatured);

  if (isLoading) {
    return <LoadingSpinner message="Initializing Portfolio Engine..." />;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            {/* Status Badge: Available for Software Engineering Roles */}
            <div className="badge-wrapper">
              <div className="availability-badge">
                <span className="status-pulse-dot"></span>
                Available for Software Engineering Roles
              </div>
            </div>

            <span className="hero-greeting">Hi, I am</span>
            <h1 className="hero-name">HarshaVardhan Reddy Kunam</h1>
            <h2 className="hero-title">Software Engineer</h2>
            <p className="hero-summary">
              Computer Science undergraduate at NIT Warangal specializing in architecting scalable backend systems, optimizing distributed data pipelines, and implementing high-performance graph algorithms.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Get In Touch
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </Link>
              <Link to="/projects" className="btn btn-secondary">
                View All Projects
              </Link>
              <a
                href="https://github.com/HarshaVardhan31012007"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <SkillsSection />

      {/* Featured Projects Preview */}
      <section className="section-container">
        <div className="container">
          <div className="section-header">
            <h2>Featured Systems &amp; Projects</h2>
            <p className="section-subtitle">
              High-concurrency platforms, graph search engines, and open-source contributions.
            </p>
            <div className="header-line"></div>
          </div>

          {/* Prop Drilling: Home -> ProjectList -> ProjectCard -> TechStackList */}
          <ProjectList projects={featuredProjects} />

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/projects" className="btn btn-primary">
              Explore All Projects &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
