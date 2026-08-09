import React from 'react';

const SkillsSection = () => {
  return (
    <section id="skills" className="section-container">
      <div className="container">
        <div className="section-header">
          <h2>Technical Proficiency</h2>
          <p className="section-subtitle">
            Core technologies and domains I utilize to build modern software solutions.
          </p>
          <div className="header-line"></div>
        </div>

        <div className="skills-grid">
          <div className="glass-card skill-category">
            <h3>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              Languages
            </h3>
            <div className="skill-chips-container">
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> C++ (Modern C++17/20)</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> Java</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> TypeScript</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> JavaScript (ES6+)</span>
            </div>
          </div>

          <div className="glass-card skill-category">
            <h3>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
              Backend &amp; Distributed
            </h3>
            <div className="skill-chips-container">
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> Node.js &amp; Express.js</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> MongoDB &amp; Geospatial</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> Redis (Caching &amp; Queues)</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> Socket.IO &amp; BullMQ</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> RESTful APIs &amp; JWT</span>
            </div>
          </div>

          <div className="glass-card skill-category">
            <h3>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"></path>
              </svg>
              Computer Science Core
            </h3>
            <div className="skill-chips-container">
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> Data Structures &amp; Algorithms</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> Operating Systems &amp; Threads</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> DBMS &amp; SQL / NoSQL</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> Graph Search Heuristics</span>
              <span className="skill-chip-item"><span className="skill-chip-dot"></span> Object-Oriented Design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
