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
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
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
              likePost={likePost}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
