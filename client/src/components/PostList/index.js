import React from "react";
import { Link } from "react-router-dom";

import YoutubeEmbed from "../YoutubeVideo";

import { useMutation } from '@apollo/client'; 
import { LIKE_POST } from '../../utils/mutations';

//import PostFooter from '../PostFooter';

const PostList = ({ posts, title, showTitle = true, showUsername = true }) => {
  
  const [likePost, {error}]  = useMutation(LIKE_POST);
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
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }
  const getVideoIdfROMuRL=(videoUrl) => {
    return  videoUrl.split("=")[1]?.split("&")[0];
}

  
  const imageStyle = {
    maxHeight: 200,
    maxWidth: 200,
  }

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
            

            <div  className="post-body">
              {post.postVideo ?(
                <>
                <YoutubeEmbed videoId={post.postVideo.split("=")[1]?.split("&")[0]} />
                </>
              ):(
                <span></span>
              )}
              <img style={imageStyle} src={post.postImage}></img>

              <p>{post.postText}</p>
            </div>
            <div className="post-footer">

            <Link
              className="btn-comment btn-block"
              to={`/posts/${post._id}`}
            >
              Comment
            </Link>
            <button className="btn-block btn-like"
               style={{
                 backgroundColor: post.likes > 0 ? '#FFC727' : '#7393B3', //Only like button can make a diff button for unlike functionality 
                color: '#fff', //styling will change 
               }}
              onClick={() => handleLike(post._id)}>
              {post.likes > 0 ? 'Like' : 'Like'}
            </button>
           <span>{post.likes}</span>
           </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;