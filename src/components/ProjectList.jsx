import React from 'react';
import ProjectCard from './ProjectCard';

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
