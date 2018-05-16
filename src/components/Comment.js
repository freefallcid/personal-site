import React from "react";

export default ({ comment }) => {
  return (
    <div className="comment">
      <img className="comment__avatar" src={comment.avatar} />
      <div>
        <h3 className="comment__name">{comment.name}</h3>
        <p className="comment__date">{comment.date}</p>
        <p className="comment__message">{comment.message}</p>
      </div>
    </div>
  );
};

export const query = graphql`
  fragment CommentFragment on MarkdownRemark {
    id
    frontmatter {
      name
      message
      email
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
