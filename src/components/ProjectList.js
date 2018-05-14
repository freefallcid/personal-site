import React from "react";
import Project from "./Project";

export default ({ projects: projectData }) => {
  const projects = projectData.edges.map(({ node }) => {
    const project = { ...node, ...node.frontmatter };
    project.image = project.image[0];
    delete project.frontmatter;
    return project;
  });

  return (
    <ul className="project-list">
      {projects.map(project => (
        <li key={project.id} className="project-list__project">
          <Project key={project.githubUrl} project={project} />
        </li>
      ))}
    </ul>
  );
};
