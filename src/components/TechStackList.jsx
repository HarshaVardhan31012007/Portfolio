import React from 'react';

/**
 * TechStackList Component
 * Grandchild component demonstrating 2-level deep prop drilling.
 * Receives techStack array passed down from ProjectCard (Child),
 * which was passed down from ProjectList / Projects Page (Parent).
 */
const TechStackList = ({ techStack }) => {
  if (!techStack || !Array.isArray(techStack)) return null;

  return (
    <div className="tech-stack">
      {techStack.map((tech, index) => (
        <span key={index} className="tech-tag">
          {tech}
        </span>
      ))}
    </div>
  );
};

export default TechStackList;
