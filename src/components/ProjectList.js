import React from "react";
import InfiniteScroll from './InfiniteScroll';
import Project from "./Project";

export default ({ projects: projectData }) => {
  const projects = projectData.edges.map(({ node }) => {
    const project = { ...node, ...node.frontmatter };
    delete project.frontmatter;
    return project;
  });

  return (
    <InfiniteScroll
      items={ projects }
      perPage={ 9 } 
      render={(projects) => (
        <ul className="project-list">
          {projects.map(project => (
            <li key={project.id} className="project-list__project">
              <Project key={project.githubUrl} project={project} />
            </li>
          ))}
        </ul>
      )}
    />
  );
};
