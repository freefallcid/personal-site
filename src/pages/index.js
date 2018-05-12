import React from "react";
import Link from "gatsby-link";
import PostList from "../components/PostList";
import ProjectList from "../components/ProjectList";

export default ({ data }) => {
  return (
    <div>
      <div>Hello world!</div>
      <PostList posts={data.posts} />
      <Link to="/blog">View all posts</Link>
      <ProjectList projects={data.projects} latest />
    </div>
  );
};

export const indexQuery = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      filter: {fileAbsolutePath: { regex: "/cms/posts/" }}
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
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
      limit: 6
    ) {
      edges {
        node {
          ...ProjectFragment
        }
      }
    }
  }
`;
