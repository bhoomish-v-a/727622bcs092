import axios from 'axios';

const BASE_URL = "http://20.244.56.144/evaluation-service";

export const fetchUsers = () => axios.get(`${BASE_URL}/users`);

export const fetchPosts = () => axios.get(`${BASE_URL}/posts`);

export const fetchComments = (postId) =>
  axios.get(`${BASE_URL}/posts/${postId}/comments`);
