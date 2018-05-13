import React from "react";
import Post from "./Post";

export default ({ posts: postData, latest }) => {
  const posts = postData.edges.map(({ node }) => {
    const post = { ...node, ...node.frontmatter };
    delete post.frontmatter;
    return post;
  });

  return (
    <ul className="post-list">
      {posts.map(post => (
        <li className="post-list__post">
          <Post key={post.path} post={post} />
        </li>
      ))}
    </ul>
  );
};
