import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostAnalytics = ({ type }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPostsAndComments = async () => {
    setLoading(true);
    try {
      const postsResponse = await axios.get('http://20.244.56.144/evaluation-service/posts');
      const postsData = postsResponse.data.posts;
      setPosts(postsData);
      
      const commentsData = {};
      for (const post of postsData) {
        const commentsResponse = await axios.get(`http://20.244.56.144/evaluation-service/posts/${post.id}/comments`);
        commentsData[post.id] = commentsResponse.data.comments;
      }
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching posts or comments', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostsAndComments();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{type === 'popular' ? 'Popular Posts' : 'Latest Posts'}</h3>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <h6>Comments:</h6>
                <ul>
                  {comments[post.id] ? (
                    comments[post.id].map((comment) => (
                      <li key={comment.id}>{comment.content}</li>
                    ))
                  ) : (
                    <li>No comments</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostAnalytics;
