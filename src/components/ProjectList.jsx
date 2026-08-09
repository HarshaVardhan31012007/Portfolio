import React from 'react';
import ProjectCard from './ProjectCard';

/**
 * ProjectList Component
 * Child component receiving projects array passed from Projects page (Parent),
 * and mapping over them to pass individual project attributes to ProjectCard (Grandchild).
 */
const ProjectList = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No projects found.</p>;
  }

  return (
    <div className="projects-grid">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          shortDescription={project.shortDescription}
          fullDescription={project.fullDescription}
          techStack={project.techStack}
          achievements={project.achievements}
          githubUrl={project.githubUrl}
          demoUrl={project.demoUrl}
          badgeText={project.badgeText}
        />
      ))}
    </div>
  );
};

export default ProjectList;
