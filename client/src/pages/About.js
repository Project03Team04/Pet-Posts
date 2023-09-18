import React from 'react';
import { useQuery, useMutation} from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.css'
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
      <div class="card" style={{width: '18rem', padding: 20}}>
    <img src="./images/steph.jpg" className="card-img-top" alt="..."></img>
    <div class="card-body">
    <h5 class="card-title">Stehanie Angelito</h5>
    <p class="card-text">As a pet owner, I'm thrilled to bring you this platform where fellow pet enthusiasts can share their furry friends' stories. With a background in biology and health sciences, I'm excited to combine my passion for pets with my career in development.</p>
  </div>
</div>
<div class="card" style={{width: '18rem', padding: 20}}>
<img src="./images/tess.jpg" className="card-img-top" alt="..."></img>
    <div class="card-body">
    <h5 class="card-title">Tess Guilmette</h5>
    <p class="card-text">My name is Tess and I am a web developer in training. My educational and professional background has been in Social Work, where I have been working in the field for six years. When I'm not working or tinkering with code, I enjoy hiking, kayaking, and playing guitar and piano. In the past couple years I have decided to start my journey into becoming a web developer. It has been an exciting to delve into this passion of mine.</p>
  </div>
</div>
<div class="card" style={{width: '18rem', padding: 20}}>
<img src="./images/elena.jpg" className="card-img-top" alt="..."></img>
   <div class="card-body">
    <h5 class="card-title">Elena Fadeeva</h5>
    <p class="card-text">Former Oilfield Engineer with MS in Chemical Engineering,
            self-taught in Fine Arts and with a huge passion in Web Developing.
            I'm artist and creator and Coding is both art and technology where
            we can create and see a final product of our labor.</p>
  </div>
</div>
<div class="card" style={{width: '18rem', padding: 20}}>
<img src="./images/amadeus.jpg" className="card-img-top" alt="..."></img>
    <div class="card-body">
    <h5 class="card-title">Amadeus Machuca</h5>
    <p class="card-text">My name is Amadeus and I've worked in the service industry for 6 years. I have done everything in a restaurant from a line cook, bartender, and chef! I a currently working to transition into the field of webdevelopment. I do not have pets myself, but my plants are pets in slow motion!</p>
  </div>
</div>
    </div>
  );
};

export default About;