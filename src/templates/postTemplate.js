import React from "react";
import Img from "../components/Image";
import Helmet from "react-helmet";
import config from "../../config";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

export default ({ data }) => {
  const post = data.post;
  const comments = data.comments;

  return (
    <div>
      <BlogPostHead post={post} />
      <article className="article">
        <div className="container">
          <header className="article__header">
            <h1 className="article__title">{post.frontmatter.title}</h1>
            <p className="article__date">{post.frontmatter.date}</p>
          </header>
          <Img className="article__image" sizes={post.image.sizes} />
          <div
            className="article__body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
        <footer className="article__footer">
          <div className="container">
            <CommentForm path={post.frontmatter.path} />
            <CommentList comments={comments} />
          </div>
        </footer>
      </article>
    </div>
  );
};

function BlogPostHead({ post }) {
  return (
    <Helmet>
      {/* General tags */}
      <title>{post.frontmatter.title}</title>
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
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
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

    comments: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/cms/comments/" }
        frontmatter: { path: { eq: $path } }
      }
      sort: { order: ASC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          ...CommentFragment
        }
      }
    }
  }
`;
