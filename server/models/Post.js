const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  postText: {
    type: String,
    required: 'You need to leave some text!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  postImage: {
    type: String,
    required: false
  },

  postVideo: {
    type: String,
    required: false
  },

  postAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },



  //addition of filed to store the number of likes
  likes: {
    type: Number,
    default: 0,
  },

  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Post = model('Post', postSchema);

module.exports = Post;
