import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";

export default ({ post }) => {
  return (
    <div className="post" key={post.title}>
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
    excerpt(pruneLength: 200)
    frontmatter {
      title
      path
      date(formatString: "MMMM DD, YYYY")
    }
    image: childrenImageSharp {
      sizes {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
