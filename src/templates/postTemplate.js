import React from "react";

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <div className="container">
      <article className="article">
        <header className="article__header">
          <h1 className="article__title">{post.frontmatter.title}</h1>
          <p className="article__date">{post.frontmatter.date}</p>
        </header>
        <div
          className="article__image"
          style={{ backgroundImage: `url(${post.frontmatter.image})` }}
        />
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
        image
      }
    }
  }
`;
