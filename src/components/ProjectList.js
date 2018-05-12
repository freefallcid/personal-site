import React from "react";
import Project from "./Project";

export default ({ projects: projectData }) => {
  const projects = projectData.edges.map(({ node }) => {
    const project = { ...node, ...node.frontmatter };
    delete project.frontmatter;
    return project;
  });

  return (
    <ul>
      {projects.map(project => (
        <Project key={project.githubUrl} project={project} />
      ))}
    </ul>
  );
};
