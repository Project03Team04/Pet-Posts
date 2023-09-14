import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import ProfileEdit from './ProfileEdit';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const Me = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // navigate to your own profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-column justify-center">
        <h2 className="">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam || user.username === Auth.getProfile().data.username ? (
  <div className="">
  <button onClick={toggleEditMode} className="btn-post text-white m-1">Edit Profile</button>
</div>
  ) : null}
<div className="user-info">
</div>

        <div className="post-form-container">
          {/* Render the ProfileEdit component when in edit mode */}
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
        {!userParam && (
          <div
            className="post-list-container"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <PostForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Me;