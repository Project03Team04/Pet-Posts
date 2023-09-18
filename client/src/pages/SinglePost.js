// import React from 'react';
import React, { useState } from "react";
// import API function
// import {likeOrUnlikePost} from '../components/api';

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

// import {LIKE_POST} from '../utils/mutations';
import { QUERY_SINGLE_POST } from "../utils/queries";

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.me || data?.post || {};

  const [isLiked, setIsLiked] = useState(false);

  // const [likePost, {error}]  = useMutation(LIKE_POST);
  // const handleLike = async () => {
  //   try {
  //     const { data } = await likePost({
  //       variables: { postId: postId },
  //     });
  //     setPost(data.likePost);
  //     setIsLiked(!isLiked);
  //   } catch (error) {
  //     console.error('Error liking post:', error);
  //   }
  //   console.log("hello")
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.post) {
    return <div>Post not found</div>;
  }

  const imageContainerStyle = {
    display: "flex",
    justifyContent: "flex-start",
  };
  const imageStyle = {
    maxHeight: 200,
    maxWidth: 200,
  };

  return (
    <div className="container ">
      <div className="post-card">
        <h3 className="post-header">
          {post.postAuthor} <br />
          <span style={{ fontSize: "0.8rem" }}>on {post.createdAt}</span>
        </h3>
        <div style={imageContainerStyle} className="post-body">
          <img style={imageStyle} src={post.postImage}></img>
          <blockquote className="p-1">{post.postText}</blockquote>
        </div>
      </div>

      <div className="my-5">
        <CommentList comments={post.comments} />
      </div>
      <div className="">
        <CommentForm postId={post._id} />
        
      </div>
    </div>
  );
};

export default SinglePost;
