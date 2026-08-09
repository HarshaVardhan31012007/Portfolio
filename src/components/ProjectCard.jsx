import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TechStackList from './TechStackList';

/**
 * ProjectCard Component
 * Generic reusable component receiving project data entirely via props.
 * Demonstrates:
 * 1. Independent component-scoped state (isExpanded useState) per instance.
 * 2. Prop drilling to grandchild component TechStackList.
 */
const ProjectCard = ({
  id,
  title,
  shortDescription,
  fullDescription,
  techStack,
  achievements,
  githubUrl,
  badgeText
}) => {
  // Independent state per ProjectCard instance
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <article className="glass-card project-card">
      <div className="project-top">
        <div className="project-top-left">
          <div className="folder-icon-wrapper">
            <svg
              className="project-folder-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          {badgeText && <span className="project-badge">{badgeText}</span>}
        </div>

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm github-btn"
            aria-label={`GitHub Repository for ${title}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        )}
      </div>

      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{shortDescription}</p>

      {/* Prop Drilling Level 2: Passing techStack prop to TechStackList */}
      <TechStackList techStack={techStack} />

      {/* Expandable Details Section (scoped instance state) */}
      {isExpanded && (
        <div className="expandable-details">
          <p style={{ color: 'var(--text-main)', fontSize: '0.92rem', marginBottom: '0.75rem', lineHeight: '1.6' }}>
            {fullDescription}
          </p>
          {achievements && achievements.length > 0 && (
            <ul className="project-achievements">
              {achievements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="project-card-actions">
        <button onClick={toggleDetails} className="btn btn-secondary btn-sm">
          {isExpanded ? 'Hide Quick Info' : 'View Quick Info'}
        </button>

        <Link to={`/projects/${id}`} className="btn btn-outline btn-sm">
          Full Details &rarr;
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
