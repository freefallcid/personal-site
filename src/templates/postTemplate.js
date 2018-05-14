import React from "react";
import Img from "gatsby-image";

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <div className="container">
      <article className="article">
        <header className="article__header">
          <h1 className="article__title">{post.frontmatter.title}</h1>
          <p className="article__date">{post.frontmatter.date}</p>
        </header>
        <Img className="article__image" sizes={post.image.sizes} />
        <main
          className="article__body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </div>
  );
};

export const postQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      image: childImageSharp {
        sizes {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;
