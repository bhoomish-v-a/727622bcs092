import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchPosts, fetchComments } from '../services/apiService';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const loadTopUsers = async () => {
      const { data: usersData } = await fetchUsers();
      const { data: postsData } = await fetchPosts();

      const userPostMap = {};

      for (const post of postsData.posts) {
        if (!userPostMap[post.userid]) userPostMap[post.userid] = [];

        userPostMap[post.userid].push(post.id);
      }

      const userCommentCounts = [];

      for (const userId in userPostMap) {
        let totalComments = 0;
        for (const postId of userPostMap[userId]) {
          const { data: commentData } = await fetchComments(postId);
          totalComments += commentData.comments.length;
        }
        userCommentCounts.push({ userId, totalComments });
      }

      userCommentCounts.sort((a, b) => b.totalComments - a.totalComments);
      const top5 = userCommentCounts.slice(0, 5).map(u => ({
        name: usersData.users[u.userId],
        comments: u.totalComments
      }));

      setTopUsers(top5);
    };

    loadTopUsers();
  }, []);

  return (
    <div className="container my-3">
      <h3>Top 5 Users by Commented Posts</h3>
      <ul className="list-group">
        {topUsers.map((user, index) => (
          <li key={index} className="list-group-item">
            <strong>{user.name}</strong> - {user.comments} Comments
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
