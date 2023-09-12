const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors')
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const multer = require('multer')
const {Post, User, Image} = require('./models/index')
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

app.post('/upload', upload.single('file'), async (req, res) => {
  const rawPath = req.file.path
  const pathName = rawPath.split("public\\")
  const publicPath = pathName[1]
  console.log(publicPath);
  const newImage = await new Image({originalName: req.file.originalname, url: publicPath})
  newImage.save()
  if (newImage) {
    console.log("back", newImage);
    res.status(201).json(newImage);
  } else {
    res.status(500).json({ error: 'Something went wrong' });
  }
})

/* app.get('/upload', async (req, res) => {
  console.log(req.query.originalName);
  try {
    const result = await Image.findOne({originalName: req.query.originalName})
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}) */


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
