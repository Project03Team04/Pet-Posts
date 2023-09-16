import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import * as HiIcons from "react-icons/hi2";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import ProfileEdit from "./ProfileEdit";
import ProfilePic from "../components/profilePic";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Me = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log("me", user.posts);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the user is not logged in
  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  // Check if the userParam matches the logged-in user's username
  if (Auth.getProfile().data.username === userParam) {
    return (
      <div>
        <h2 className="">
          Viewing {userParam ? `${userParam}'s` : "your"} profile.
        </h2>
        {Auth.loggedIn() && (
          <div className="">
            <button onClick={toggleEditMode} className="btn-submit m-1">
              Edit Profile
            </button>
          </div>
        )}
        <div className="user-info">
          <h3>Username: {user.username}</h3>
          <h3> Bio: {user.bio}</h3>
        </div>
        <div className="post-form-container">
          {editMode ? (
            <ProfileEdit user={user} />
          ) : (
            <PostList
              posts={user.posts}
              title={`${user.username}'s posts...`}
              showTitle={false}
              showUsername={false}
            />
          )}
        </div>
        <div
          className="post-list-container"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <PostForm />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="">
        Viewing {userParam ? `${user.username}'s` : "your"} profile.
      </h2>
      {Auth.loggedIn() && (
        <div className="">
          <button onClick={toggleEditMode} className="btn-save m-1">
            <HiIcons.HiMiniPencil className="mx-1" />
            Edit Profile
          </button>
        </div>
      )}

      <div className="user-info">
        <h3>Username: {user.username}</h3>
        <h3> Bio: {user.bio} </h3>
      </div>
      <div className="post-form-container">
        {editMode ? (
          <ProfileEdit user={user} />
        ) : (
          <PostList
            posts={user.posts}
            title={`${user.username}'s posts...`}
            showTitle={false}
            showUsername={false}
          />
        )}
      </div>
      <div
        className="post-list-container"
        style={{ border: "1px dotted #1a1a1a" }}
      >
        <PostForm />
      </div>
    </div>
  );
};

export default Me;
