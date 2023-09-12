import React from 'react';
import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';
import { useTheme } from "../utils/ThemeContext";

const Home = () => {
  const {theme}=useTheme();
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main className={theme}>
      <div className="flex-column justify-center">
        <div
          className="post-form-container"
          
        >
          <PostForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              posts={posts}
              title="Some Feed for Pet(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
