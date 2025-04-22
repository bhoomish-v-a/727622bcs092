import React from 'react';

const PostCard = ({ post }) => (
  <div className="card shadow-sm mb-3">
    <div className="card-body">
      <h5 className="card-title">Post #{post.id}</h5>
      <p className="card-text">{post.content}</p>
      <p className="text-muted">User ID: {post.userid}</p>
    </div>
  </div>
);

export default PostCard;
