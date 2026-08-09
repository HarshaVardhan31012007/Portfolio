import React, { useState } from 'react';
import ProjectList from '../components/ProjectList';
import { projectsData } from '../data/projects';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Backend & Systems', 'Algorithms & Search', 'AI & Distributed Systems', 'Algorithms & Web'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory);

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

        {/* Prop Drilling: Projects Page -> ProjectList -> ProjectCard -> TechStackList */}
        <ProjectList projects={filteredProjects} />
      </div>
    </div>
  );
};

export default Projects;
