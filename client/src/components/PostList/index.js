import React from 'react';
import { Link } from 'react-router-dom';

// import { useMutation } from '@apollo/client';
// import { LIKE_POST } from '../../utils/mutations';

const PostList = ({
  posts,
  title,
  likePost,
  showTitle = true,
  showUsername = true,
}) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }
  // const [likePost, {error}]  = useMutation(LIKE_POST);
  const handleLike = async (postId ) => {
    try {
      const { data } = await likePost({
        variables: { postId: postId },
      });
  
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
    console.log("hello")
  };
  console.log(posts)
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${post.postAuthor}`}
                >
                  {post.postAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    posted this post on {post.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You posted this post on {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{post.postText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
              Join the discussion on this post.
            </Link>
            <button
          style={{
            backgroundColor: post.likes > 0 ? '#ff0000' : '#007bff', // Change colors as needed
            color: '#fff', // Change text color as needed
            border: 'none',
            padding: '10px 20px', // Adjust padding as needed
            cursor: 'pointer',}}
            onClick={() => handleLike(post._id)}>
           {post.likes > 0 ? 'Unlike' : 'Like'}
        </button>
        <span>{post.likes}</span>
          </div>
        ))}
    </div>
  );
};

export default PostList;
