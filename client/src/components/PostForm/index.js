import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";



const  PostForm = () =>{
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState("");
  const fileSelectorRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
 
  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const imageUrl = postImage ? await handleUpload() : "";
    console.log("try this", postVideo);
   
 
    //const embedUrl=`https://www.youtube.com/embed/${videoId}`;

    try {
      const { data } = await addPost({
        variables: {
          postText,
          postImage: imageUrl,
          postVideo,
          postAuthor: Auth.getProfile().data.username,
        },
      });

      setPostText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 280) {
      setPostText(value);
      setCharacterCount(value.length);
    }
  };

 const handleVideo = (event) => {

    setPostVideo(event.target.value);
   
  } 

  const handleImageSelect = (event) => {
      setPostImage(event.target.files[0]);
  }

  
  const handleUpload = async () => {
    const { url } = await fetch("/s3Url").then((res) => res.json());

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: postImage,
    });

    const imageUrl = url.split("?")[0];
    console.log("this is the url", imageUrl);

    setUploadedImageUrl(imageUrl);
    setPostImage(null);
    fileSelectorRef.current.value = null;
    return imageUrl;
  };

  return (
    <div className="post-form" >
      <h3 >What's on your pet mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`text-grey ${
              characterCount === 280 || error ? "text-danger" : ""
            }` } style={{ fontSize: '0.825rem' }}
          >
            Character Count: {characterCount}/280
          </p>

          <form  onSubmit={handleFormSubmit}>
            <div className="post-form-body">
             
              <textarea
                name="postText"
                placeholder="Here's a new post..."
                value={postText}
                className="post-form-input "
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <input
              type="file"
              id="postImage"
              ref={fileSelectorRef}
              onChange={handleImageSelect}
              className="p-2"
            ></input>
            <div className="p-2">
              Youtube URL:
              <input id="postVideo" type="url" onChange={handleVideo}
               className="mx-1"></input>
            </div>
            <div className="post-form-footer display-flex justify-center ">
              <button
                className="btn-post btn-thin text-white m-1"
                type="submit"
                onClick={handleUpload}
              >
                Add Post
              </button>
            </div>

            {error && (
              <div className="col-12 my-3 bg-danger p-3">{error.message}</div>
            )}
          </form>

        </>
      ) : (
        <p>
          You need to be logged in to share your posts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PostForm;