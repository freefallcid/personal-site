import React from "react";
import InfiniteScroll from './InfiniteScroll';
import Post from "./Post";

export default ({ posts: postData, latest }) => {
  const posts = postData.edges.map(({ node }) => {
    const post = { ...node, ...node.frontmatter };
    delete post.frontmatter;
    return post;
  });

  return (
    <InfiniteScroll
      items={ posts }
      perPage={ 6 } 
      render={(posts) => (
        <ul className="post-list">
          {posts.map(post => (
            <li key={post.id} className="post-list__post">
              <Post key={post.path} post={post} />
            </li>
          ))}
        </ul>
      )}
    />
  );
};
