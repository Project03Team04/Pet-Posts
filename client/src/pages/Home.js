import React from 'react';
import { useQuery, useMutation} from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';
import { LIKE_POST } from '../utils/mutations';
const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  const [likePost, {error}]  = useMutation(LIKE_POST);


  return (
    <main>
      <div className="flex-column justify-center">
        <div
          className="post-form-container"
          
        >
          <PostForm />
        </div>
        <div className="">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              posts={posts}
              title="Some Feed for Pet(s)..."
              likePost = {likePost}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;