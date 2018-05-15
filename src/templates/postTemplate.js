import React from "react";
import Img from "gatsby-image";
import Helmet from "react-helmet";
import config from "../../config";

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <div className="container">
      <BlogPostHead post={post} />
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

function BlogPostHead({ post }) {
  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={post.excerpt} />
      <meta name="image" content={post.image.sizes.src} />

      {/* OpenGraph tags */}
      <meta
        property="og:url"
        content={config.siteUrl + post.frontmatter.path}
      />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.frontmatter.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta
        property="og:image"
        content={config.siteUrl + post.image.sizes.src}
      />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@bhnywl" />
      <meta name="twitter:title" content={post.frontmatter.title} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta
        name="twitter:image"
        content={config.siteUrl + post.image.sizes.src}
      />
    </Helmet>
  );
}

export const postQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 180)
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
