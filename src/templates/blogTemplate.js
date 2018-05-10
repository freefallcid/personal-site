import React from "react";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  console.log(frontmatter);
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <ul>
          {frontmatter.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
        <h2>{frontmatter.date}</h2>
        <img src={frontmatter.image} />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        image
        tags
      }
    }
  }
`;
