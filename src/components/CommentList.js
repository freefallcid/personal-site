import React from "react";
import Comment from "./Comment";

export default ({ comments: commentData }) => {
  const comments = commentData.edges.map(({ node }) => {
    const comment = { ...node, ...node.frontmatter };
    comment.avatar = `https://www.gravatar.com/avatar/${comment.email}?s=200&d=mm`;
    delete comment.frontmatter;
    return comment;
  });

  return (
    <ul className="comment-list">
      {comments.map(comment => (
        <li key={comment.id} className="comment-list__comment">
          <Comment key={`${comment.date}-${comment.name}`} comment={comment} />
        </li>
      ))}
    </ul>
  );
};
