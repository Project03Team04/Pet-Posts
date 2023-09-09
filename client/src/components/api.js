import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

// Function to like/unlike a post
export const likeOrUnlikePost = async (postId) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts/like/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};