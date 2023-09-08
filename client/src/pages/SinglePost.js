// import React from 'react';
import React, { useState } from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_POST } from '../utils/queries';

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const [post, setPost] = useState(data?.post || {});
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await post(`/api/posts/like/${post._id}`);
      const updatedLikes = response.data.likes;
      setPost({ ...post, likes: updatedLikes });
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.post) {
    return <div>Post not found</div>;
  }


  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {post.postAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this to share on {post.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {post.postText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={post.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm postId={post._id} />
        <div>
        <button
          style={{
            backgroundColor: isLiked ? '#ff0000' : '#007bff', // Change colors as needed
            color: '#fff', // Change text color as needed
            border: 'none',
            padding: '10px 20px', // Adjust padding as needed
            cursor: 'pointer',}}
            onClick={handleLike}>
           {isLiked ? 'Unlike' : 'Like'}
        </button>

        <span>{post.likes}</span>
      </div>
      </div>

    </div>
  );
};

export default SinglePost;
