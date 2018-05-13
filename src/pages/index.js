import React from "react";
import PostList from "../components/PostList";
import ProjectList from "../components/ProjectList";
import ViewAllLink from "../components/ViewAllLink";

export default ({ data }) => {
  return (
    <div>
      <div className="container">
        <div className="page-header">
          <h2 className="page-header__heading">
            I am Ben Honeywill, a web developer.
            <strong> Welcome to my website.</strong>
          </h2>
          <p className="page-header__paragraph">
            Here you'll find my development related blog posts and side projects.
          </p>
        </div>

        <section className="section">
          <ViewAllLink name="posts" to="/blog" />
          <PostList posts={data.posts} />
        </section>

        <section className="section">
          <ViewAllLink name="projects" to="/projects" />
          <ProjectList projects={data.projects} />
        </section>
      </div>
    </div>
  );
};

export const indexQuery = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      filter: {fileAbsolutePath: { regex: "/cms/posts/" }}
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 2
    ) {
      edges {
        node {
          ...PostFragment
        }
      }
    }
    
    projects: allMarkdownRemark(
      filter: {fileAbsolutePath: { regex: "/cms/projects/" }}
      sort: { order: DESC, fields: [frontmatter___order] }
      limit: 3
    ) {
      edges {
        node {
          ...ProjectFragment
        }
      }
    }
  }
`;
