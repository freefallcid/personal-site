import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import PostList from "../components/PostList";

export default ({ data }) => {
  return (
    <div className="container">
      <Helmet>
        <title>Blog - bhnywl</title>
      </Helmet>
      <div className="page-header">
        <h2 className="page-header__heading">
          Read some of my
          <strong> blog posts.</strong>
        </h2>
        <p className="page-header__paragraph">
          I write articles all about front-end web development.
        </p>
      </div>

      <section className="section">
        <PostList posts={data.posts} />
      </section>
    </div>
  );
};

export const blogQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/cms/posts/" } }
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
