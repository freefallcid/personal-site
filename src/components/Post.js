import React from "react";
import Link from "gatsby-link";
import Img from "./Image";

export default ({ post }) => {
  return (
    <div className="post">
      <Link className="post__link" to={post.path}>
        <Img className="post__image" sizes={post.image.sizes} />
        <div>
          <h3 className="post__title">{post.title}</h3>
          <p className="post__date">{post.date}</p>
          <p className="post__excerpt">{post.excerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export const query = graphql`
  fragment PostFragment on MarkdownRemark {
    id
    excerpt(pruneLength: 180)
    frontmatter {
      title
      path
      date(formatString: "MMMM DD, YYYY")
    }
    image: childImageSharp {
      sizes {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
