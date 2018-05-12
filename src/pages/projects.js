import React from "react";
import Link from "gatsby-link";
import ProjectList from "../components/ProjectList";

export default ({ data }) => {
  console.log(data);
  return (
    <div>
      <div>Projects</div>
      <ProjectList projects={data.projects} />
    </div>
  );
};

export const projectsQuery = graphql`
  query ProjectsQuery {
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/cms/projects/" }}
      sort: { order: DESC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          ...ProjectFragment
        }
      }
    }
  }
`;
