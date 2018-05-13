import React from "react";
import Link from "gatsby-link";

export default ({ project }) => {
  return (
    <div className="project">
      <Link className="project__link" to={project.githubUrl}>
        <div
          className="project__thumbnail"
          style={{ backgroundImage: `url(${project.thumbnail})` }}
        />
        <h3 className="project__title">{project.title}</h3>
        <p className="project__description">{project.description}</p>
      </Link>
    </div>
  );
};

export const query = graphql`
  fragment ProjectFragment on MarkdownRemark {
    frontmatter {
      title
      thumbnail
      githubUrl
      description
    }
  }
`;
