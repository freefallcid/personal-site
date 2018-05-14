import React from "react";
import Link from "gatsby-link";
import ProjectList from "../components/ProjectList";

export default ({ data }) => {
  return (
    <div className="container">
      <div className="page-header">
        <h2 className="page-header__heading">
          Take a look at some of
          <strong> my projects.</strong>
        </h2>
        <p className="page-header__paragraph">
          Below are some of my open source Github repositories and projects.
        </p>
      </div>

      <section className="section">
        <ProjectList projects={data.projects} />
      </section>
    </div>
  );
};

export const projectsQuery = graphql`
  query ProjectsQuery {
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/cms/projects/" } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          ...ProjectFragment
        }
      }
    }
  }
`;
