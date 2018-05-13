import React from "react";
import Link from "gatsby-link";

export default ({ post }) => {
  return (
    <div className="post" key={post.title}>
      <Link className="post__link" to={post.path}>
        <div
          className="post__thumbnail"
          style={{ backgroundImage: `url(${post.thumbnail})` }}
        />
        <h3 className="post__title">{post.title}</h3>
        <p className="post__excerpt">{post.excerpt}</p>
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
