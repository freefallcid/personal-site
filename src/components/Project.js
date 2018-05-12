import React from "react";

export default ({ project }) => {
  return (
    <div>
      <img src={project.thumbnail} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.githubUrl &&
        <a href={project.githubUrl} target="_blank">
          View on GitHub
        </a>}
      {project.liveUrl &&
        <a href={project.liveUrl} target="_blank">
          View demo
        </a>}
    </div>
  );
};

export const query = graphql`
  fragment ProjectFragment on MarkdownRemark {
    frontmatter {
      title
      thumbnail
      githubUrl
      liveUrl
      description
    }
  }
`;
