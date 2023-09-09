const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
// const Post = require('./models/Post');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// // route to handle post likes/unlikes
// app.post('/posts/like/:postId', async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const user = req.user; 
    
//     // Check if the user has already liked the post
//     const post = await Post.findById(post._id);

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const alreadyLiked = post.likes.includes(user._id);

//     if (alreadyLiked) {
//       // User has already liked the post, so unlike it
//       post.likes = post.likes.filter((userId) => userId !== user._id);
//     } else {
//       // User hasn't liked the post, so like it
//       post.likes.push(user._id);
//     }

//     await post.save();

//     return res.status(200).json({ likes: post.likes.length });
//   } catch (error) {
//     console.error('Error liking/unliking post:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });



// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
