import React from 'react';
import { useQuery, useMutation} from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';
import { LIKE_POST } from '../utils/mutations';
const About = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  const [likePost, {error}]  = useMutation(LIKE_POST);


  return (
    <div>
        ABOUT
    </div>
  );
};

export default About;