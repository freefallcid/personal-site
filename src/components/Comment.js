import React from "react";

export default ({ comment }) => {
  return (
    <div className="comment">
      <img className="comment__avatar" src={comment.avatar} />
      <div>
        <h3 className="comment__name">{comment.name}</h3>
        <p className="comment__date">{comment.date}</p>
        <div
          className="comment__message"
          dangerouslySetInnerHTML={{ __html: comment.html }}
        />
      </div>
    </div>
  );
};

export const query = graphql`
  fragment CommentFragment on MarkdownRemark {
    html
    frontmatter {
      name
      email
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
