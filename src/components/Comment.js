import React from "react";
import Linkify from "react-linkify";

export default ({ comment }) => {
  return (
    <div className="comment">
      <img className="comment__avatar" src={comment.avatar} />
      <div>
        <h3 className="comment__name">{comment.name}</h3>
        <p className="comment__date">{comment.date}</p>
        <p className="comment__body">
          <Linkify properties={{ target: "_blank", rel: "nofollow" }}>
            {comment.body}
          </Linkify>
        </p>
      </div>
    </div>
  );
};

export const query = graphql`
  fragment CommentFragment on MarkdownRemark {
    id
    frontmatter {
      name
      body
      email
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
