import React from "react";
import { Link } from "react-router-dom";
//import PostFooter from '../PostFooter';
const PostList = ({ posts, title, showTitle = true, showUsername = true }) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }
  // const [likePost, {error}]  = useMutation(LIKE_POST);
  const handleLike = async (postId ) => {
    try {
      const { data } = await likePost({
        variables: { postId: postId },
      });
      window.location.reload(); 
    } catch (error) {
      console.error('Error liking post:', error);
    }
    console.log("hello")
    
  };
  console.log(posts)
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="post-card ">
            <h4 className="post-header">
              {showUsername ? (
                <Link className="text-gray" to={`/profiles/${post.postAuthor}`}>
                  {post.postAuthor}
                  <span className="post-date">{post.createdAt}</span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You posted this post on {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            
            <div className="post-body">
              <img src={post.postImage}></img>
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
            backgroundColor: post.likes > 0 ? '#7393B3' : '#7393B3', //Only like button can make a diff button for unlike functionality 
            color: '#fff', //styling will change 
            border: 'none',
            padding: '10px 20px', 
            cursor: 'pointer',}}
            onClick={() => handleLike(post._id)}>
           {post.likes > 0 ? 'Like' : 'Like'}
        </button>
        <span>{post.likes}</span>
          </div>
        ))}
    </div>
  );
};

export default PostList;
