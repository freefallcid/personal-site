import React from "react";
import Link from "gatsby-link";

export default ({ post }) => {
  return (
    <div key={post.title}>
      <Link to={post.path}>
        <img src={post.thumbnail} />
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </Link>
    </div>
  );
};

export const query = graphql`
  fragment PostFragment on MarkdownRemark {
    excerpt(pruneLength: 280)
    frontmatter {
      title
      path
      thumbnail
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
