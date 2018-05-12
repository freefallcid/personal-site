import React from "react";
import Link from "gatsby-link";
import PostList from "../components/PostList";

export default ({ data }) => {
  return (
    <div>
      <div>Blog</div>
      <PostList posts={data.posts} />
    </div>
  );
};

export const blogQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/cms/posts/" }}
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          ...PostFragment
        }
      }
    }
  }
`;
